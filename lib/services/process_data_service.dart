import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class ProcessDataService {
  static const String _processDataKey = 'process_data';

  Future<void> saveProcessData(Map<String, dynamic> processData) async {
    final prefs = await SharedPreferences.getInstance();
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
