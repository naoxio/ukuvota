/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:flutter_svg/flutter_svg.dart';

class VotingProposalCard extends StatefulWidget {
  final Proposal proposal;
  final Function(String, int) onVoteChanged;
  final int selectedVote;

  const VotingProposalCard({
    Key? key,
    required this.proposal,
    required this.onVoteChanged,
    required this.selectedVote,
  }) : super(key: key);

  @override
  VotingProposalCardState createState() => VotingProposalCardState();
}

class VotingProposalCardState extends State<VotingProposalCard> {
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
    widget.onVoteChanged(widget.proposal.id, vote);
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width.clamp(0, 600);

    const double baseEmojiSize = 48.0;

    final double scalingFactor = (screenWidth / 400).clamp(0.8, 1.5);

    final double emojiSize = baseEmojiSize * scalingFactor;

    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              widget.proposal.title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            HtmlWidget(convertToHtml(widget.proposal.description)),
            const SizedBox(height: 16),
            Wrap(
              alignment: WrapAlignment.center,
              spacing: 8,
              runSpacing: 8,
              children: List.generate(
                7,
                (index) {
                  // Use the fallback Text directly
                  return IconButton(
                    icon: ColorFiltered(
                      colorFilter: widget.selectedVote == index - 3
                          ? const ColorFilter.mode(
                              Colors.transparent,
                              BlendMode.color,
                            )
                          : const ColorFilter.matrix(<double>[
                              0.2126,
                              0.7152,
                              0.0722,
                              0,
                              0,
                              0.2126,
                              0.7152,
                              0.0722,
                              0,
                              0,
                              0.2126,
                              0.7152,
                              0.0722,
                              0,
                              0,
                              0,
                              0,
                              0,
                              1,
                              0,
                            ]),
                      child: SvgPicture.asset(
                        'assets/emojis/${_emojiNames[index]}.svg',
                        width: emojiSize,
                        height: emojiSize,
                        placeholderBuilder: (BuildContext context) => Text(
                          _emojiNames[index],
                          style: TextStyle(
                              color: widget.selectedVote == index - 3
                                  ? Colors.blue
                                  : Colors.grey),
                        ),
                      ),
                    ),
                    onPressed: () => _updateSelectedVote(index - 3),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
