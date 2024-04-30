import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/process_scaffold.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/process/voting_list.dart';

class VotingScreen extends StatefulWidget {
  final Process process;

  const VotingScreen({Key? key, required this.process}) : super(key: key);

  @override
  VotingScreenState createState() => VotingScreenState();
}

class VotingScreenState extends State<VotingScreen> {
  late String _endTime;
  final _voterNameController = TextEditingController();
  late Map<String, int> _votes;

  @override
  void initState() {
    super.initState();
    _votes = {};
  }

  void _updateVotes(Map<String, int> votes) {
    setState(() {
      _votes = votes;
    });
  }

  void _submitVote() {
    final voterName = _voterNameController.text.trim();
    if (voterName.isEmpty) {
      _showSnackBar(AppLocalizations.of(context)!.alertErrorEmptyName);
      return;
    }

    ProcessDataService()
        .submitVote(
            widget.process.id,
            voterName,
            _votes.entries
                .map((entry) => {
                      'proposalId': entry.key,
                      'vote': entry.value,
                    })
                .toList())
        .then((_) {
      _showSnackBar(AppLocalizations.of(context)!.alertSuccessSubmitVote);
    }).catchError((error) {
      //_showSnackBar(AppLocalizations.of(context)!.alertErrorSubmitVote);
      print('Error submitting vote: $error');
    });
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final process = widget.process;

    return ProcessScaffold(
      process: process,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(
            '${localizations.processVoters}: ${process.voters?.length ?? '0'}',
          ),
          VotingList(
            processId: process.id,
            proposals: process.proposals,
            onVotesChanged: _updateVotes,
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  controller: _voterNameController,
                  decoration: InputDecoration(
                    hintText: localizations.processVoterName,
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: _submitVote,
                child: Text(localizations.processSubmitVote),
              ),
            ],
          ),
        ],
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
