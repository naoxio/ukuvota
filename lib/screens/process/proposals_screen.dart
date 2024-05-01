/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/process_scaffold.dart';
import 'package:ukuvota/services/shared_process_service.dart';
import 'package:ukuvota/widgets/process/proposals_list.dart';

class ProposalsScreen extends StatefulWidget {
  final Process process;
  const ProposalsScreen({Key? key, required this.process}) : super(key: key);

  @override
  ProposalsScreenState createState() => ProposalsScreenState();
}

class ProposalsScreenState extends State<ProposalsScreen> {
  late DateTime _endTime;

  @override
  void initState() {
    super.initState();
    _endTime =
        DateTime.fromMillisecondsSinceEpoch(widget.process.proposalDates![1]);

    _saveProcessId();
    _startTimer();
  }

  Future<void> _saveProcessId() async {
    final processId = widget.process.id;
    await SharedProcessService().addUUID(processId);
  }

  @override
  Widget build(BuildContext context) {
    final process = widget.process;

    return ProcessScaffold(
      process: process,
      child: Column(
        children: [
          ProposalsList(
            isSetup: false,
            processId: process.id,
            proposals: process.proposals,
            onProposalsUpdated: (proposal) {},
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _startTimer();
  }

  void _startTimer() {
    final currentTime = DateTime.now();
    final timeLeft = _endTime.difference(currentTime);
    if (timeLeft.isNegative) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go('/process/${widget.process.id}/results');
      });
    } else {
      Future.delayed(
        timeLeft.inMilliseconds > 1000 ? const Duration(seconds: 1) : timeLeft,
        _startTimer,
      );
    }
  }
}
