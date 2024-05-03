/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class DashboardPreferences {
  static const String _uuidDataKey = 'process_uuids';

  Future<void> addUUID(String uuid) async {
    final prefs = await SharedPreferences.getInstance();
    final existingUUIDsString = prefs.getString(_uuidDataKey);
    List<String> uuids;
    if (existingUUIDsString != null) {
      uuids = List<String>.from(jsonDecode(existingUUIDsString));
    } else {
      uuids = [];
    }

    if (!uuids.contains(uuid)) {
      uuids.add(uuid);
      await prefs.setString(_uuidDataKey, jsonEncode(uuids));
    }
  }

  Future<List<String>> fetchUUIDs() async {
    final prefs = await SharedPreferences.getInstance();
    final uuidsString = prefs.getString(_uuidDataKey);
    if (uuidsString != null) {
      return List<String>.from(jsonDecode(uuidsString));
    }
    return [];
  }

  /// Clears all stored UUIDs from shared preferences.
  Future<void> clearUUIDs() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_uuidDataKey);
  }
}
