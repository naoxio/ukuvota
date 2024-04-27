import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class ProcessDataService {
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
