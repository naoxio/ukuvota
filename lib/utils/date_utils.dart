/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:intl/intl.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

void initializeTimeZones() {
  tz.initializeTimeZones();
}

String formatDuration(int durationInSeconds) {
  const times = {
    'year': 31536000,
    'month': 2592000,
    'day': 86400,
    'hour': 3600,
    'minute': 60,
    'second': 1,
  };
  String result = '';
  int remainingSeconds = durationInSeconds;
  if (durationInSeconds >= times['year']!) {
    final years = remainingSeconds ~/ times['year']!;
    remainingSeconds %= times['year']!;
    final months = remainingSeconds ~/ times['month']!;
    if (years > 0) result += '${years}y ';
    if (months > 0) result += '${months}mo';
  } else if (durationInSeconds >= times['month']!) {
    final months = remainingSeconds ~/ times['month']!;
    remainingSeconds %= times['month']!;
    final days = remainingSeconds ~/ times['day']!;
    if (months > 0) result += '${months}mo ';
    if (days > 0) result += '${days}d';
  } else if (durationInSeconds >= times['day']!) {
    final days = remainingSeconds ~/ times['day']!;
    remainingSeconds %= times['day']!;
    final hours = remainingSeconds ~/ times['hour']!;
    if (days > 0) result += '${days}d ';
    if (hours > 0) result += '${hours}h';
  } else if (durationInSeconds >= times['hour']!) {
    final hours = remainingSeconds ~/ times['hour']!;
    remainingSeconds %= times['hour']!;
    final minutes = remainingSeconds ~/ times['minute']!;
    if (hours > 0) result += '${hours}h ';
    if (minutes > 0) result += '${minutes}m';
  } else if (durationInSeconds >= times['minute']! * 5) {
    final minutes = remainingSeconds ~/ times['minute']!;
    if (minutes > 0) result += '${minutes}m';
  } else if (durationInSeconds > 0) {
    result = '${remainingSeconds}s';
  } else {
    result = '0s';
  }
  return result.trim();
}

String formatDateInTimezone(int utcMillis, String timezone,
    [String formatStr = 'MMMM d, yyyy, h:mm a']) {
  tz.Location location = tz.getLocation(timezone);
  final date = tz.TZDateTime.fromMillisecondsSinceEpoch(location, utcMillis);
  return DateFormat(formatStr, 'en_US').format(date);
}

String formatDate(int utcMillis) {
  final date = DateTime.fromMillisecondsSinceEpoch(utcMillis);
  return DateFormat("yyyy-MM-dd'T'HH:mm").format(date);
}

String prettyFormatInTimezone(DateTime dateTime, String? timezone) {
  final defaultTimezone =
      tz.local.name; // Use the client's current timezone as the default
  String formattedDate;

  try {
    if (timezone != null) {
      tz.Location location = tz.getLocation(timezone);
      tz.TZDateTime tzDateTime = tz.TZDateTime.from(dateTime, location);
      formattedDate = DateFormat('MMMM d, yyyy, h:mm a').format(tzDateTime);
    } else {
      tz.Location location = tz.getLocation(defaultTimezone);
      tz.TZDateTime tzDateTime = tz.TZDateTime.from(dateTime, location);
      formattedDate = DateFormat('MMMM d, yyyy, h:mm a').format(tzDateTime);
    }
  } catch (e) {
    tz.Location location = tz.getLocation(defaultTimezone);
    tz.TZDateTime tzDateTime = tz.TZDateTime.from(dateTime, location);
    formattedDate = DateFormat('MMMM d, yyyy, h:mm a').format(tzDateTime);
  }

  return formattedDate;
}
