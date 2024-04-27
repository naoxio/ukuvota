import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:timezone/timezone.dart' as tz;
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/models/proposal.dart';

class ProcessDataService {
  Future<Process?> fetchProcessData(String processId) async {
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process/$processId');
    final DataSnapshot snapshot = await processRef.get();

    if (snapshot.exists) {
      final Map<String, dynamic> processData =
          Map<String, dynamic>.from(snapshot.value as Map);

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
            debugPrint(
                'Object not found in Firebase Storage: ${error.message}');
          } else {
            debugPrint('Error fetching description content: $error');
          }
        }
      }

      final String timezone = processData['timezone'] ?? 'UTC';
      final DateTime currentTime = DateTime.now();
      final DateTime proposalEndTime = tz.TZDateTime.from(
        DateTime.fromMillisecondsSinceEpoch(processData['proposalDates'][1]),
        tz.getLocation(timezone),
      ).toUtc();

      if (currentTime.isAfter(proposalEndTime)) {
        if (!processData.containsKey('proposals')) {
          return Process.fromMap(processData);
        }

        final Map<String, dynamic> proposalsObj =
            Map<String, dynamic>.from(processData['proposals']);
        await Future.wait(
            proposalsObj.entries.map((MapEntry<String, dynamic> entry) async {
          final String index = entry.key;
          final Map<String, dynamic> proposal =
              Map<String, dynamic>.from(entry.value);
          final String id = proposal['id'] ?? index;

          if (id.isNotEmpty && proposal.containsKey('description')) {
            final Reference proposalDescriptionRef =
                FirebaseStorage.instance.ref().child('proposals/$id.json');
            await proposalDescriptionRef.putString(
                json.encode({'description': proposal['description']}));
            await processRef.child('proposals/$id/description').remove();
          }
        }));

        final List<Proposal> updatedProposals = await Future.wait(
            proposalsObj.entries.map((MapEntry<String, dynamic> entry) async {
          final String index = entry.key;
          final Map<String, dynamic> proposal =
              Map<String, dynamic>.from(entry.value);
          final String id = proposal['id'] ?? index;

          if (id.isNotEmpty && id != '-1') {
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
                try {
                  proposal['description'] =
                      json.decode(descriptionData['description']);
                } catch (error) {
                  debugPrint('Error parsing description JSON: $error');
                  proposal['description'] = descriptionData['description'];
                }
              } else {
                proposal['description'] = descriptionData['description'];
              }

              proposal['id'] = id;
            } catch (error) {
              debugPrint(
                  'Failed to fetch description from Firebase Storage: $error');
              proposal.remove('description');
            }
          }

          return Proposal.fromMap(proposal);
        }));

        processData['proposals'] = updatedProposals;
      }

      return Process.fromMap(processData);
    } else {
      return null;
    }
  }
}
