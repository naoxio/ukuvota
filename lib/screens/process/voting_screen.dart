// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
import 'package:ukuvota/utils/process_utils.dart';
import 'package:ukuvota/widgets/layout/process_scaffold.dart';
import 'package:ukuvota/widgets/process/voting_list.dart';

class VotingScreen extends StatefulWidget {
  final String processId;

  const VotingScreen({Key? key, required this.processId}) : super(key: key);

  @override
  VotingScreenState createState() => VotingScreenState();
}

class VotingScreenState extends State<VotingScreen> {
  late String _endTime;
  final _voterNameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return ChangeNotifierProvider(
      create: (_) => ProcessDataProvider(),
      child: Consumer<ProcessDataProvider>(
        builder: (context, processDataProvider, _) {
          return FutureBuilder<Process?>(
            future: processDataProvider.fetchProcessData(widget.processId),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else {
                final process = processDataProvider.processData!;
                final proposals = process.proposals ?? [];
                _endTime = process.votingDates[1] as String;
                final expectedPath = getProcessUrl(process);

                if (expectedPath != ModalRoute.of(context)?.settings.name) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    context.go(expectedPath);
                  });
                }

                return ProcessScaffold(
                  process: process,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '${localizations.processVoters}: ${process.voters?.length ?? '0'}',
                      ),
                      VotingList(
                        processId: widget.processId,
                        proposals: proposals,
                      ),
                      const SizedBox(height: 16),
                      Text(localizations.processVoterName),
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _voterNameController,
                              decoration: InputDecoration(
                                hintText: localizations.alertInfoSubmittingVote,
                              ),
                            ),
                          ),
                          ElevatedButton(
                            onPressed: _submitVote,
                            child: Text(localizations.alertSuccessSubmitVote),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }
            },
          );
        },
      ),
    );
  }

  void _submitVote() {
    final voterName = _voterNameController.text.trim();
    if (voterName.isEmpty) {
      _showSnackBar(AppLocalizations.of(context)!.alertErrorEmptyName);
      return;
    }

    // Implement the logic to submit the vote
    // ...

    // Show success or error SnackBar based on the result
    // _showSnackBar(AppLocalizations.of(context)!.alertSuccessSubmitVote);
    // _showSnackBar(AppLocalizations.of(context)!.alertErrorSubmitVote);
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }

  @override
  void dispose() {
    _voterNameController.dispose();
    super.dispose();
    _startTimer();
  }

  void _startTimer() {
    final endTimeDate = DateTime.parse(_endTime);
    final currentTime = DateTime.now();
    final timeLeft = endTimeDate.difference(currentTime);
    if (timeLeft.isNegative) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go('/process/${widget.processId}/results');
      });
    } else {
      Future.delayed(
        timeLeft.inMilliseconds > 1000 ? const Duration(seconds: 1) : timeLeft,
        _startTimer,
      );
    }
  }
}
