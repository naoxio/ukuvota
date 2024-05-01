/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/process_scaffold.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/services/shared_process_service.dart';
import 'package:ukuvota/widgets/process/voting_list.dart';

class VotingScreen extends StatefulWidget {
  final Process process;

  VotingScreen({Key? key, required this.process}) : super(key: key);

  @override
  VotingScreenState createState() => VotingScreenState();
}

class VotingScreenState extends State<VotingScreen> {
  late DateTime _endTime;
  late Process _process;

  @override
  void initState() {
    super.initState();
    _process = widget.process;
    _endTime = DateTime.fromMillisecondsSinceEpoch(_process.votingDates[1]);
    _saveProcessId();
    _startTimer();
  }

  Future<void> _saveProcessId() async {
    final processId = widget.process.id;
    await SharedProcessService().addUUID(processId);
  }

  void _reloadProcessData() async {
    final processId = _process.id;
    final newProcess = await ProcessDataService().fetchProcessData(processId);
    if (newProcess != null) {
      setState(() {
        _process = newProcess;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return ProcessScaffold(
      process: _process,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            '${localizations.processVoters}: ${_process.voters?.length ?? '0'}',
          ),
          VotingList(
            processId: _process.id,
            proposals: _process.proposals,
            onVoteSubmitted: () {
              _reloadProcessData();
            },
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }

  void _startTimer() {
    final currentTime = DateTime.now();
    final timeLeft = _endTime.difference(currentTime);

    if (timeLeft.isNegative) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go('/process/${_process.id}/results');
      });
    } else {
      Future.delayed(
        timeLeft.inMilliseconds > 1000 ? const Duration(seconds: 1) : timeLeft,
        _startTimer,
      );
    }
  }
}
