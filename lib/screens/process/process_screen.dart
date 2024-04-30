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
    final proposalStartDate =
        DateTime.fromMillisecondsSinceEpoch(process.proposalDates![0]);
    final proposalEndDate =
        DateTime.fromMillisecondsSinceEpoch(process.proposalDates![1]);
    final votingStartDate =
        DateTime.fromMillisecondsSinceEpoch(process.votingDates[0]);
    final currentTime = DateTime.now();

    if (currentTime.isBefore(proposalStartDate)) {
      final timeUntilProposalStart = proposalStartDate.difference(currentTime);
      _proposalTimer = Timer(timeUntilProposalStart, () {
        context.go('/process/${process.id}/proposals');
      });
    } else if (currentTime.isAfter(proposalEndDate) &&
        currentTime.isBefore(votingStartDate)) {
      final timeUntilVotingStart = votingStartDate.difference(currentTime);
      _votingTimer = Timer(timeUntilVotingStart, () {
        context.go('/process/${process.id}/voting');
      });
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
