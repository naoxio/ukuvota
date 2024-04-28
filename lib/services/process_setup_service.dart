// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class ProcessSetupService {
  static const String _processDataKey = 'process_data';

  Future<void> saveProcessData(Map<String, dynamic> newProcessData) async {
    final prefs = await SharedPreferences.getInstance();
    final existingProcessDataString = prefs.getString(_processDataKey);

    Map<String, dynamic> processData;
    if (existingProcessDataString != null) {
      processData = jsonDecode(existingProcessDataString);
      processData.addAll(newProcessData);
    } else {
      processData = newProcessData;
    }

    await prefs.setString(_processDataKey, jsonEncode(processData));
  }

  Future<Map<String, dynamic>?> getProcessData() async {
    final prefs = await SharedPreferences.getInstance();
    final processDataString = prefs.getString(_processDataKey);
    if (processDataString != null) {
      return jsonDecode(processDataString);
    }
    return null;
  }

  Future<void> clearProcessData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_processDataKey);
  }
}
