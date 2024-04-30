import 'package:flutter/material.dart';
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

  static VotingListState? of(BuildContext context) {
    return context.findAncestorStateOfType<VotingListState>();
  }

  @override
  VotingListState createState() => VotingListState();
}

class VotingListState extends State<VotingList> {
  late Map<String, int> _votes;

  Map<String, int> get votes => _votes;
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

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
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
    );
  }
}
