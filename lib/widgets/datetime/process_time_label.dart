/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/widgets/datetime/countdown.dart';

class ProcessTimeLabel extends StatelessWidget {
  final String phase;
  final List<int> dates;
  final String timezone;
  final int proposalsLength;

  const ProcessTimeLabel({
    Key? key,
    required this.phase,
    required this.dates,
    required this.timezone,
    this.proposalsLength = 0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final startDate = DateTime.fromMillisecondsSinceEpoch(dates[0]);
    final endDate = DateTime.fromMillisecondsSinceEpoch(dates[1]);
    final now = DateTime.now();
    final label = phase == 'voting'
        ? localizations.phasesVotingTitle
        : localizations.phasesProposalTitle;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label),
        if (startDate.isAfter(now))
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 8),
              Text('${localizations.phasesStart}: '),
              Text(
                DateFormat('MMMM d, yyyy h:mm a').format(startDate),
                style: const TextStyle(color: Colors.green),
              ),
              const SizedBox(height: 8),
              Text('${localizations.phasesLastFor}: '),
              Countdown(
                dates: dates,
                type: 'success',
                timezone: timezone,
              ),
            ],
          )
        else if (endDate.isAfter(now))
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (proposalsLength == 0)
                Text(
                  localizations.skipped,
                  style: const TextStyle(color: Colors.blue),
                )
              else
                Row(
                  children: [
                    Countdown(
                      dates: dates,
                      type: 'warning',
                      timezone: timezone,
                    ),
                    Text(' (${localizations.remainingTime})'),
                  ],
                ),
            ],
          )
        else
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (proposalsLength == 0)
                Text(
                  localizations.skipped,
                  style: const TextStyle(color: Colors.blue),
                )
              else
                Text(
                  localizations.buttonDone,
                  style: const TextStyle(color: Colors.blue),
                ),
            ],
          ),
      ],
    );
  }
}
