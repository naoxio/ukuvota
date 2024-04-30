/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/process_scaffold.dart';

class ProcessScreen extends StatefulWidget {
  final Process process;

  const ProcessScreen({Key? key, required this.process}) : super(key: key);

  @override
  ProcessScreenState createState() => ProcessScreenState();
}

class ProcessScreenState extends State<ProcessScreen> {
  Timer? _proposalTimer;
  Timer? _votingTimer;

  @override
  void initState() {
    super.initState();
    _setupTimers();
  }

  @override
  void dispose() {
    _proposalTimer?.cancel();
    _votingTimer?.cancel();
    super.dispose();
  }

  void _setupTimers() {
    final process = widget.process;
    final currentTime = DateTime.now();

    // Check if proposalDates are defined
    if (process.proposalDates != null && process.proposalDates!.length == 2) {
      final proposalStartDate =
          DateTime.fromMillisecondsSinceEpoch(process.proposalDates![0]);
      final proposalEndDate =
          DateTime.fromMillisecondsSinceEpoch(process.proposalDates![1]);

      if (currentTime.isBefore(proposalStartDate)) {
        final timeUntilProposalStart =
            proposalStartDate.difference(currentTime);
        _proposalTimer = Timer(timeUntilProposalStart, () {
          context.go('/process/${process.id}/proposals');
        });
      } else if (currentTime.isAfter(proposalEndDate)) {
        // Skip to checking votingDates if currentTime is after proposalEndDate
        _checkVotingDates(process, currentTime);
      }
    } else {
      // If proposalDates are not defined, skip directly to checking votingDates
      _checkVotingDates(process, currentTime);
    }
  }

  void _checkVotingDates(Process process, DateTime currentTime) {
    if (process.votingDates.length == 2) {
      final votingStartDate =
          DateTime.fromMillisecondsSinceEpoch(process.votingDates[0]);
      final votingEndDate =
          DateTime.fromMillisecondsSinceEpoch(process.votingDates[1]);

      if (currentTime.isBefore(votingStartDate)) {
        final timeUntilVotingStart = votingStartDate.difference(currentTime);
        _votingTimer = Timer(timeUntilVotingStart, () {
          context.go('/process/${process.id}/voting');
        });
      } else if (currentTime.isAfter(votingEndDate)) {
        context.go('/process/${process.id}/results');
      }
    } else {
      context.go('/create');
    }
  }

  @override
  Widget build(BuildContext context) {
    final process = widget.process;

    return ProcessScaffold(
      process: process,
      child: const Center(
        child: Text('Process Details'),
      ),
    );
  }
}
