/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/widgets/process/voting_proposal_card.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class VotingList extends StatefulWidget {
  final String processId;
  final List<Proposal>? proposals;
  final VoidCallback onVoteSubmitted;

  const VotingList({
    Key? key,
    required this.processId,
    required this.proposals,
    required this.onVoteSubmitted,
  }) : super(key: key);

  @override
  VotingListState createState() => VotingListState();
}

class VotingListState extends State<VotingList> {
  late Map<String, int> _votes;

  final _voterNameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _votes = {};
    for (final proposal in widget.proposals!) {
      _votes[proposal.id] = 0;
    }
  }

  @override
  void dispose() {
    _voterNameController.dispose();
    super.dispose();
  }

  void _updateVote(String proposalId, int vote) {
    setState(() {
      _votes[proposalId] = vote;
    });
  }

  void _submitVotes() {
    final voterName = _voterNameController.text.trim();

    if (voterName.isEmpty) {
      _showSnackBar(AppLocalizations.of(context)!.alertErrorEmptyName);
      return;
    }

    final votes = _votes.entries
        .map((entry) => {
              'proposalId': entry.key,
              'vote': entry.value,
            })
        .toList();

    ProcessDataService()
        .submitVote(widget.processId, voterName, votes)
        .then((_) {
      _showSuccessSnackBar(voterName);
      _votes.clear();
      widget.onVoteSubmitted();
      _voterNameController.clear();
    }).catchError((error) {
      print('Error submitting votes: $error');
    });
  }

  void _showSuccessSnackBar(String voterName) {
    final message =
        '${AppLocalizations.of(context)!.alertSuccessSubmitVote} $voterName';
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
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

    return SingleChildScrollView(
      child: Column(
        children: [
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: widget.proposals!.length,
            itemBuilder: (context, index) {
              final proposal = widget.proposals![index];
              return VotingProposalCard(
                proposal: Proposal(
                  id: proposal.id,
                  title: proposal.title,
                  description: proposal.description,
                ),
                onVoteChanged: (proposalId, vote) =>
                    _updateVote(proposalId, vote),
                selectedVote: _votes[proposal.id] ?? 0,
              );
            },
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
                onPressed: _submitVotes,
                child: Text(AppLocalizations.of(context)!.processSubmitVote),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
