import 'package:flutter/material.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/proposal_utils.dart';

class ProposalCard extends StatefulWidget {
  final Proposal proposal;
  final Function(int) onVoteChanged;

  const ProposalCard({
    Key? key,
    required this.proposal,
    required this.onVoteChanged,
  }) : super(key: key);

  @override
  ProposalCardState createState() => ProposalCardState();
}

class ProposalCardState extends State<ProposalCard> {
  int _selectedVote = 0;

  final List<String> _emojiNames = [
    'rage',
    'angry',
    'sad',
    'neutral',
    'smiling',
    'happy',
    'loving',
  ];

  void _updateSelectedVote(int vote) {
    setState(() {
      _selectedVote = vote;
    });
    widget.onVoteChanged(vote);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.proposal.title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            HtmlWidget(convertToHtml(widget.proposal.description!)),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(
                7,
                (index) => IconButton(
                  icon: Icon(
                    _getEmojiIconData(_emojiNames[index]),
                    color:
                        _selectedVote == index - 3 ? Colors.amber : Colors.grey,
                  ),
                  onPressed: () => _updateSelectedVote(index - 3),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData _getEmojiIconData(String emojiName) {
    return IconData(
      0xe900 + _emojiNames.indexOf(emojiName),
      fontFamily: 'Emojis',
    );
  }
}
