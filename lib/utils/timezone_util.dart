import 'dart:io';
import 'package:flutter_timezone_plus/flutter_timezone_plus.dart';

String getTimezoneName() {
  if (Platform.isLinux) {
    final link = File('/etc/localtime').resolveSymbolicLinksSync();
    final parts = link.split('/');
    return parts.skipWhile((value) => value != 'zoneinfo').skip(1).join('/');
  } else {
    return '';
  }
}

Future<String> getCurrentTimeZone() async {
  String? currentTimeZone;

  if (Platform.isLinux) {
    currentTimeZone = getTimezoneName();
  } else {
    currentTimeZone = await FlutterTimezone.getLocalTimezone();
  }

  return currentTimeZone ?? 'UTC';
}
