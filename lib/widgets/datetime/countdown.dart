/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class Countdown extends StatefulWidget {
  final List<int> dates;
  final String type;
  final String timezone;

  const Countdown({
    Key? key,
    required this.dates,
    required this.type,
    required this.timezone,
  }) : super(key: key);

  @override
  CountdownState createState() => CountdownState();
}

class CountdownState extends State<Countdown> {
  late DateTime targetDate;
  late Timer timer;

  @override
  void initState() {
    super.initState();
    targetDate = DateTime.fromMillisecondsSinceEpoch(widget.dates[1]);
    timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  String formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final hours = twoDigits(duration.inHours.remainder(24));
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$hours:$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final currentDate = DateTime.now();
    final diff = targetDate.difference(currentDate);

    TextStyle textStyle;
    String text;

    if (diff.inMilliseconds > 0) {
      final duration = formatDuration(diff);
      text = duration;

      if (widget.type == 'warning' && diff.inMilliseconds > 300000) {
        textStyle = const TextStyle(color: Colors.orange);
      } else if (widget.type == 'warning' && diff.inMilliseconds <= 300000) {
        textStyle = const TextStyle(color: Colors.red);
      } else if (widget.type == 'success') {
        textStyle = const TextStyle(color: Colors.green);
      } else {
        textStyle = const TextStyle();
      }
    } else {
      textStyle = const TextStyle(color: Colors.blue);
      text = localizations.buttonDone;
    }

    return Text(text, style: textStyle);
  }
}
