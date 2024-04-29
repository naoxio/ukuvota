/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/widgets/process/proposal_card.dart';

class VotingList extends StatefulWidget {
  final String processId;
  final List<Proposal>? proposals;

  const VotingList({
    Key? key,
    required this.processId,
    required this.proposals,
  }) : super(key: key);

  @override
  VotingListState createState() => VotingListState();
}

class VotingListState extends State<VotingList> {
  late Map<String, int> _votes;

  @override
  void initState() {
    super.initState();
    _votes = {};
    for (final proposal in widget.proposals!) {
      _votes[proposal.id] = 0;
    }
  }

  void _updateVote(String proposalId, int vote) {
    setState(() {
      _votes[proposalId] = vote;
    });
  }

  Future<void> _submitVotes(String voterName) async {
    final votes = _votes.entries
        .map((entry) => {
              'proposalId': entry.key,
              'vote': entry.value,
            })
        .toList();

    final voteData = {
      'name': voterName,
      'votes': votes,
    };

    // Implement the logic to submit the votes to the server
    // ...

    // Show success or error SnackBar based on the result
    // ScaffoldMessenger.of(context).showSnackBar(
    //   SnackBar(
    //     content: Text(AppLocalizations.of(context)!.alertSuccessSubmitVote),
    //   ),
    // );
    // ScaffoldMessenger.of(context).showSnackBar(
    //   SnackBar(
    //     content: Text(AppLocalizations.of(context)!.alertErrorSubmitVote),
    //   ),
    // );
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: widget.proposals!.length,
      itemBuilder: (context, index) {
        final proposal = widget.proposals![index];
        return ProposalCard(
          proposal: Proposal(
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
          ),
          onVoteChanged: (vote) => _updateVote(proposal.id, vote),
        );
      },
    );
  }
}
