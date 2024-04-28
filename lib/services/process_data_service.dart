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

class ProcessDataService {
  Future<void> createProcess(
      String processId, Map<String, dynamic> processData) async {
    try {
      // Store the process data in Firebase
      await FirebaseDatabase.instance
          .ref()
          .child('processes')
          .child(processId)
          .set(processData);
    } catch (error) {
      // Handle any errors that occur during the process creation
      throw Exception('Failed to create the process: $error');
    }
  }

  Future<Process?> fetchProcessData(String processId) async {
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process/$processId');
    final DataSnapshot snapshot = await processRef.get();

    if (snapshot.exists) {
      final Map<String, dynamic> processData =
          Map<String, dynamic>.from(snapshot.value as Map);

      debugPrint('Process data: $processData');

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
          debugPrint('Description content: $descriptionContent');
        } catch (error) {
          if (error is FirebaseException &&
              error.code == 'storage/object-not-found') {
            debugPrint(
                'Object not found in Firebase Storage: ${error.message}');
          } else {
            debugPrint('Error fetching description content: $error');
          }
        }
      }

      final String timezone = processData['timezone'] ?? 'UTC';
      final DateTime currentTime = DateTime.now();

      final DateTime proposalEndTime;
      if (processData['proposalDates'] is List) {
        debugPrint('proposalDates is a List');
        proposalEndTime = tz.TZDateTime.from(
          DateTime.fromMillisecondsSinceEpoch(
              processData['proposalDates'][1] as int),
          tz.getLocation(timezone),
        ).toUtc();
      } else {
        debugPrint('proposalDates is not a List');
        // Handle the case when 'proposalDates' is not a list
        // You can throw an exception or provide a default value
        throw Exception('Invalid proposalDates format');
      }
      if (currentTime.isAfter(proposalEndTime)) {
        if (!processData.containsKey('proposals')) {
          debugPrint('No proposals found');
          return Process.fromMap(processData);
        }
        final Map<String, dynamic> proposalsObj = {};
        processData['proposals'].asMap().forEach((index, proposalData) {
          final proposal = Map<String, dynamic>.from(proposalData);
          final id = proposal['id'] ?? index.toString();
          proposalsObj[id] = proposal;
        });

        await Future.wait(
          proposalsObj.entries.map((MapEntry<String, dynamic> entry) async {
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

        print('after proposals');
        final List<Proposal> updatedProposals = await Future.wait(
          proposalsObj.entries.map((MapEntry<String, dynamic> entry) async {
            final String index = entry.key;
            final Map<String, dynamic> proposal =
                Map<String, dynamic>.from(entry.value);
            final String id = proposal['id'] ?? index;

            if (id.isNotEmpty &&
                id != '-1' &&
                proposal.containsKey('description')) {
              final Reference proposalDescriptionRef =
                  FirebaseStorage.instance.ref().child('proposals/$id.json');
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
        );
        processData['proposals'] = updatedProposals;
      }
      return Process.fromMap(processData);
    } else {
      debugPrint('Process not found');
      return null;
    }
  }
}
