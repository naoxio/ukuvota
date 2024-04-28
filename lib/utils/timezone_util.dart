/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:io' if (dart.library.io) 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter_timezone_plus/flutter_timezone_plus.dart';

String? _getTimezoneName() {
  if (!kIsWeb) {
    try {
      return _getTimezoneNameLinux();
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}

String? _getTimezoneNameLinux() {
  final link = File('/etc/localtime').resolveSymbolicLinksSync();
  final parts = link.split('/');
  return parts.skipWhile((value) => value != 'zoneinfo').skip(1).join('/');
}

Future<String> getCurrentTimeZone() async {
  String? currentTimeZone;

  // Strategy 1: Get timezone name for Linux
  if (!kIsWeb) {
    currentTimeZone = _getTimezoneName();
    if (currentTimeZone != null) {
      return currentTimeZone;
    }
  }

  // Strategy 2: Get timezone using flutter_timezone_plus
  try {
    currentTimeZone = await FlutterTimezone.getLocalTimezone();
    if (currentTimeZone != null) {
      return currentTimeZone;
    }
    // ignore: empty_catches
  } catch (e) {}

  // Fallback to 'UTC' if all strategies fail
  return 'UTC';
}

// Conditional import of 'dart:io' for non-web platforms
