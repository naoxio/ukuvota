/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:firebase_database/firebase_database.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:uuid/uuid.dart';

class ProcessDataService {
  Future<void> createProcess(
      String processId, Map<String, dynamic> processData) async {
    try {
      await FirebaseDatabase.instance
          .ref()
          .child('process')
          .child(processId)
          .set(processData);
    } catch (error) {
      throw Exception('Failed to create the process: $error');
    }
  }

  Future<void> submitVote(String processId, String voterName,
      List<Map<String, dynamic>> votes) async {
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
    final processes = <String, Process>{};

    for (final processId in processIds) {
      final process = await fetchProcessData(processId);
      if (process != null) {
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

      final dynamic proposalsData = processData['proposals'];
      final List<Proposal> updatedProposals = [];

      if (proposalsData is Map<String, dynamic>) {
        updatedProposals.addAll(
          proposalsData.entries.map((MapEntry<String, dynamic> entry) {
            final String id = entry.key;
            final Map<String, dynamic> proposal =
                Map<String, dynamic>.from(entry.value);
            proposal['id'] = id;
            return Proposal.fromMap(proposal);
          }),
        );
      } else if (proposalsData is List<dynamic>) {
        updatedProposals.addAll(
          proposalsData.asMap().entries.map((MapEntry<int, dynamic> entry) {
            final int index = entry.key;
            final Map<String, dynamic> proposal =
                Map<String, dynamic>.from(entry.value);
            final String id = proposal['id'] ?? index.toString();
            proposal['id'] = id;
            return Proposal.fromMap(proposal);
          }),
        );
      }

      processData['proposals'] = updatedProposals;

      return Process.fromMap(processData);
    } else {
      return null;
    }
  }
}
