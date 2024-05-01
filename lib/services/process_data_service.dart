/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:timezone/timezone.dart' as tz;
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:uuid/uuid.dart';

class ProcessDataService {
  Future<void> createProcess(
      String processId, Map<String, dynamic> processData) async {
    try {
      // Store the process data in Firebase
      await FirebaseDatabase.instance
          .ref()
          .child('process')
          .child(processId)
          .set(processData);
    } catch (error) {
      // Handle any errors that occur during the process creation
      throw Exception('Failed to create the process: $error');
    }
  }

  Future<void> submitVote(String processId, String voterName,
      List<Map<String, dynamic>> votes) async {
    print(processId);
    print(voterName);
    print(votes);
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process/$processId');
    final DataSnapshot processSnapshot = await processRef.get();
    final Map<dynamic, dynamic>? processData =
        processSnapshot.value as Map<dynamic, dynamic>?;

    if (processData == null) {
      throw Exception('Process not found');
    }

    final String voterId = const Uuid().v4();
    final Map<String, dynamic> newVoter = {
      'id': voterId,
      'name': voterName,
      'votes': votes,
    };

    List<dynamic> voters = processData['voters'] ?? [];
    voters.add(newVoter);

    final Map<String, dynamic> proposalUpdates = {};
    for (final vote in votes) {
      final String proposalId = vote['proposalId'];
      final int voteValue = vote['vote'];

      final List<dynamic> proposals = processData['proposals'] ?? [];
      final int proposalIndex = proposals.indexWhere(
        (proposal) => (proposal as Map<dynamic, dynamic>)['id'] == proposalId,
      );

      if (proposalIndex >= 0) {
        proposalUpdates['proposals/$proposalIndex/votes/$voterId'] = voteValue;
      }
    }

    await processRef.update({
      'voters': voters,
      ...proposalUpdates,
    });
  }

  Future<Map<String, Process>> fetchProcessesByIds(
      List<String> processIds) async {
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process');
    final DataSnapshot snapshot = await processRef.get();

    final processes = <String, Process>{};
    for (final processId in processIds) {
      if (snapshot.child(processId).exists) {
        final processData =
            Map<String, dynamic>.from(snapshot.child(processId).value as Map);
        final process = Process.fromMap(processData);
        processes[processId] = process;
      }
    }

    return processes;
  }

  Future<Process?> fetchProcessData(String processId) async {
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process/$processId');
    final DataSnapshot snapshot = await processRef.get();

    if (snapshot.exists) {
      final Map<String, dynamic> processData =
          Map<String, dynamic>.from(snapshot.value as Map);
      print(processData);
      if (!processData.containsKey('description') &&
          processData.containsKey('descriptionId')) {
        final Reference descriptionRef = FirebaseStorage.instance
            .ref()
            .child('descriptions/${processData['descriptionId']}.json');
        try {
          final String downloadURL = await descriptionRef.getDownloadURL();
          final http.Response response = await http.get(Uri.parse(downloadURL));
          final Map<String, dynamic> descriptionContent =
              json.decode(response.body);
          processData['description'] = descriptionContent;
        } catch (error) {
          if (error is FirebaseException &&
              error.code == 'storage/object-not-found') {
          } else {
            debugPrint('Error fetching description content: $error');
          }
        }
      }

      final String timezone = processData['timezone'] ?? 'UTC';
      final DateTime currentTime = DateTime.now();

      final DateTime? proposalEndTime;
      if (processData['proposalDates'] is List) {
        proposalEndTime = tz.TZDateTime.from(
          DateTime.fromMillisecondsSinceEpoch(
              processData['proposalDates'][1] as int),
          tz.getLocation(timezone),
        ).toUtc();
      } else {
        proposalEndTime = null;
      }
      if (proposalEndTime == null || currentTime.isBefore(proposalEndTime)) {
        if (!processData.containsKey('proposals')) {
          debugPrint('No proposals found');
          return Process.fromMap(processData);
        }

        final dynamic proposalsData = processData['proposals'];
        final List<Proposal> updatedProposals = [];

        if (proposalsData is Map<String, dynamic>) {
          await Future.wait(
            proposalsData.entries.map((MapEntry<String, dynamic> entry) async {
              final String id = entry.key;
              final Map<String, dynamic> proposal = entry.value;
              if (proposal.containsKey('description')) {
                final Reference proposalDescriptionRef =
                    FirebaseStorage.instance.ref().child('proposals/$id.json');
                await proposalDescriptionRef.putString(
                  json.encode({'description': proposal['description']}),
                );
                await processRef.child('proposals/$id/description').remove();
              }
            }),
          );

          updatedProposals.addAll(
            await Future.wait(
              proposalsData.entries
                  .map((MapEntry<String, dynamic> entry) async {
                final String id = entry.key;
                final Map<String, dynamic> proposal =
                    Map<String, dynamic>.from(entry.value);

                if (id.isNotEmpty &&
                    id != '-1' &&
                    proposal.containsKey('description')) {
                  final Reference proposalDescriptionRef = FirebaseStorage
                      .instance
                      .ref()
                      .child('proposals/$id.json');
                  try {
                    final String downloadURL =
                        await proposalDescriptionRef.getDownloadURL();
                    final http.Response response =
                        await http.get(Uri.parse(downloadURL));
                    final Map<String, dynamic> descriptionData =
                        json.decode(response.body);
                    if (descriptionData['description'] is String) {
                      proposal['description'] = descriptionData['description'];
                    } else {
                      proposal['description'] =
                          json.encode(descriptionData['description']);
                    }
                  } catch (error) {
                    debugPrint(
                        'Failed to fetch description from Firebase Storage: $error');
                  }
                }
                proposal['id'] = id;

                return Proposal.fromMap(proposal);
              }),
            ),
          );
        } else if (proposalsData is List<dynamic>) {
          updatedProposals.addAll(
            await Future.wait(
              proposalsData
                  .asMap()
                  .entries
                  .map((MapEntry<int, dynamic> entry) async {
                final int index = entry.key;
                final Map<String, dynamic> proposal =
                    Map<String, dynamic>.from(entry.value);
                final String id = proposal['id'] ?? index.toString();

                if (id.isNotEmpty &&
                    id != '-1' &&
                    proposal.containsKey('description')) {
                  final Reference proposalDescriptionRef = FirebaseStorage
                      .instance
                      .ref()
                      .child('proposals/$id.json');
                  try {
                    final String downloadURL =
                        await proposalDescriptionRef.getDownloadURL();
                    final http.Response response =
                        await http.get(Uri.parse(downloadURL));
                    final Map<String, dynamic> descriptionData =
                        json.decode(response.body);
                    if (descriptionData['description'] is String) {
                      proposal['description'] = descriptionData['description'];
                    } else {
                      proposal['description'] =
                          json.encode(descriptionData['description']);
                    }
                  } catch (error) {
                    debugPrint(
                        'Failed to fetch description from Firebase Storage: $error');
                  }
                }
                proposal['id'] = id;

                return Proposal.fromMap(proposal);
              }),
            ),
          );
        }

        processData['proposals'] = updatedProposals;
      }
      return Process.fromMap(processData);
    } else {
      debugPrint('Process not found');
      return null;
    }
  }
}
