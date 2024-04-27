import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:timezone/timezone.dart' as tz;

class ProcessDataService {
  Future<Map<String, dynamic>?> fetchProcessData(String processId) async {
    Map<String, dynamic>? process;
    final DatabaseReference processRef =
        FirebaseDatabase.instance.ref().child('process/$processId');
    final DataSnapshot snapshot = await processRef.get();

    if (snapshot.exists) {
      process = Map<String, dynamic>.from(snapshot.value as Map);

      if (!process.containsKey('description') &&
          process.containsKey('descriptionId')) {
        final Reference descriptionRef = FirebaseStorage.instance
            .ref()
            .child('descriptions/${process['descriptionId']}.json');
        try {
          final String downloadURL = await descriptionRef.getDownloadURL();
          final http.Response response = await http.get(Uri.parse(downloadURL));
          final Map<String, dynamic> descriptionContent =
              json.decode(response.body);
          process['description'] = descriptionContent;
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

      final String timezone = process['timezone'] ?? 'UTC';
      final DateTime currentTime = DateTime.now();
      final DateTime proposalEndTime = tz.TZDateTime.from(
        DateTime.fromMillisecondsSinceEpoch(process['proposalDates'][1]),
        tz.getLocation(timezone),
      ).toUtc();

      if (currentTime.isAfter(proposalEndTime)) {
        if (!process.containsKey('proposals')) {
          return process;
        }

        final Map<String, dynamic> proposalsObj =
            Map<String, dynamic>.from(process['proposals']);
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

        final List<Map<String, dynamic>> updatedProposals = await Future.wait(
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

          return proposal;
        }));

        process['proposals'] = updatedProposals;
      }
    } else {
      process = null;
    }

    return process;
  }
}
