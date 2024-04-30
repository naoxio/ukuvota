/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class SharedProcessService {
  static const String _sharedProcessDataKey = 'shared_process_data';

  Future<void> saveSharedProcessData(
      Map<String, dynamic> newProcessData) async {
    final prefs = await SharedPreferences.getInstance();
    final existingProcessDataString = prefs.getString(_sharedProcessDataKey);
    Map<String, dynamic> processData;
    if (existingProcessDataString != null) {
      processData = jsonDecode(existingProcessDataString);
      processData.addAll(newProcessData);
    } else {
      processData = newProcessData;
    }
    await prefs.setString(_sharedProcessDataKey, jsonEncode(processData));
  }

  Future<Map<String, dynamic>?> getSharedProcessData() async {
    final prefs = await SharedPreferences.getInstance();
    final processDataString = prefs.getString(_sharedProcessDataKey);
    print(processDataString);
    if (processDataString != null) {
      return jsonDecode(processDataString);
    }

    return null;
  }

  Future<void> clearSharedProcessData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_sharedProcessDataKey);
  }
}
