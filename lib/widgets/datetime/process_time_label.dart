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
    final DateFormat formatter = DateFormat('MMMM d, yyyy h:mm a');

    if (phase == 'completed') {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${localizations.phaseCompleted}: ${DateFormat('MMMM d, yyyy h:mm a').format(endDate)}',
            style: const TextStyle(color: Colors.blue),
          ),
        ],
      );
    }

    final label = phase == 'voting'
        ? localizations.phasesVotingTitle
        : localizations.phasesProposalTitle;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label),
        if (startDate.isAfter(now))
          _buildUpcomingStart(localizations, formatter, startDate)
        else if (endDate.isAfter(now))
          _buildActivePhase(localizations, dates, timezone)
        else
          _buildPhaseEnded(localizations),
      ],
    );
  }

  Widget _buildUpcomingStart(AppLocalizations localizations,
      DateFormat formatter, DateTime startDate) {
    // Phase has not started yet
    return Row(
      children: [
        Text('${localizations.phasesStart}: ${formatter.format(startDate)}'),
      ],
    );
  }

  Widget _buildActivePhase(
    AppLocalizations localizations,
    List<int> dates,
    String timezone,
  ) {
    if (phase == 'voting' && proposalsLength == 0) {
      return Text(
        localizations.skipped,
        style: const TextStyle(color: Colors.orange),
      );
    } else {
      return Row(
        children: [
          Countdown(dates: dates, type: 'warning', timezone: timezone),
          Text(' (${localizations.remainingTime})'),
        ],
      );
    }
  }

  Widget _buildPhaseEnded(AppLocalizations localizations) {
    // Phase has ended
    return Text(
      localizations.buttonDone,
      style: const TextStyle(color: Colors.blue),
    );
  }
}
