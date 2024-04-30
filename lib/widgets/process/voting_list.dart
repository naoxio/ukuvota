import 'package:flutter/material.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/widgets/process/proposal_card.dart';

class VotingList extends StatefulWidget {
  final String processId;
  final List<Proposal>? proposals;
  final Function(Map<String, int> votes) onVotesChanged;

  const VotingList({
    Key? key,
    required this.processId,
    required this.proposals,
    required this.onVotesChanged,
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
    widget.onVotesChanged(_votes);
  }

  void _updateVote(String proposalId, int vote) {
    setState(() {
      _votes[proposalId] = vote;
    });
    widget.onVotesChanged(_votes);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
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
        ),
      ],
    );
  }
}
