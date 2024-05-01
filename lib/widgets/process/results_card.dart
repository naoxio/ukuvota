/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/widgets/process/results_voters_tab.dart';
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:ukuvota/utils/export_utils.dart';
import 'package:screenshot/screenshot.dart';
import 'package:universal_html/html.dart' as html;

const List<String> emojiNames = [
  'rage',
  'angry',
  'sad',
  'neutral',
  'smiling',
  'happy',
  'loving',
];

class ResultsCard extends StatefulWidget {
  final Process process;

  const ResultsCard({Key? key, required this.process}) : super(key: key);

  @override
  ResultsCardState createState() => ResultsCardState();
}

class ResultsCardState extends State<ResultsCard>
    with SingleTickerProviderStateMixin {
  List<Voter> selectedVoters = [];
  List<Voter> allVoters = [];
  late TabController _tabController;
  final ScreenshotController _screenshotController = ScreenshotController();

  @override
  void initState() {
    super.initState();
    allVoters = widget.process.voters ?? [];
    selectedVoters = List.from(allVoters);
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  double getTotal(String proposalId) {
    return selectedVoters.fold(0.0, (sum, voter) {
      final vote = voter.votes.firstWhere(
        (vote) => vote.proposalId == proposalId,
        orElse: () => Vote(proposalId: '', vote: 0),
      );
      double voteValue = vote.vote.toDouble();
      if (voteValue < 0) {
        voteValue *= double.parse(widget.process.weighting ?? '1');
      }
      return sum + voteValue;
    });
  }

  double getAverageScore(double total) {
    if (selectedVoters.isNotEmpty) {
      return (total / selectedVoters.length).roundToDouble();
    }
    return 0;
  }

  Widget getAverageEmoji(double total) {
    final average = getAverageScore(total);
    final emojiIndex = (average + 3).clamp(0, emojiNames.length - 1).toInt();
    return SvgPicture.asset('emojis/${emojiNames[emojiIndex]}.svg');
  }

  void exportMarkdown() {
    final markdown = generateMarkdown(widget.process, selectedVoters);
    saveMarkdown(markdown, '${widget.process.title}.md');
  }

  void exportImage() async {
    final imageBytes = await _screenshotController.capture();
    if (imageBytes != null) {
      final blob = html.Blob([imageBytes], 'image/png');
      final url = html.Url.createObjectUrlFromBlob(blob);
      final anchor = html.document.createElement('a') as html.AnchorElement
        ..href = url
        ..style.display = 'none'
        ..download = '${widget.process.title}.png';
      html.document.body!.children.add(anchor);
      anchor.click();
      html.document.body!.children.remove(anchor);
      html.Url.revokeObjectUrl(url);
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final proposals = widget.process.proposals ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (allVoters.isEmpty)
          Center(
            child: Text(
              localizations.processNoVotesSubmitted,
              style: const TextStyle(color: Colors.orange),
            ),
          ),
        if (proposals.isNotEmpty)
          Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: TabBar(
                      controller: _tabController,
                      tabs: const [
                        Tab(icon: Icon(Icons.emoji_emotions)),
                        Tab(icon: Icon(Icons.list)),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 600,
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    Screenshot(
                      controller: _screenshotController,
                      child: _buildResultsTab(localizations, proposals),
                    ),
                    ResultsVotersTab(
                      selectedVoters: selectedVoters,
                      proposals: proposals,
                    ),
                  ],
                ),
              ),
            ],
          )
        else
          Center(
            child: Text(
              localizations.processNoProposalsSubmitted,
              style: const TextStyle(fontSize: 18),
            ),
          ),
      ],
    );
  }

  Widget _buildResultsTab(
      AppLocalizations localizations, List<Proposal> proposals) {
    final sortedProposals = proposals.toList()
      ..sort((a, b) => getTotal(b.id).compareTo(getTotal(a.id)));

    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${localizations.processVoters} (${selectedVoters.length}/${allVoters.length}):',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Wrap(
            children: allVoters.map((voter) {
              final isSelected = selectedVoters.contains(voter);
              return Padding(
                padding: const EdgeInsets.all(4),
                child: FilterChip(
                  label: Text(voter.name),
                  selected: isSelected,
                  onSelected: (selected) {
                    setState(() {
                      if (selected) {
                        selectedVoters.add(voter);
                      } else {
                        selectedVoters.remove(voter);
                      }
                    });
                  },
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 16),
          DataTable(
            columns: [
              DataColumn(label: Text(localizations.processProposal)),
              DataColumn(label: Text(localizations.processAverageScore)),
              DataColumn(label: Text(localizations.processTotalScore)),
            ],
            rows: sortedProposals.map((proposal) {
              final total = getTotal(proposal.id);
              return DataRow(
                cells: [
                  DataCell(
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          truncateString(proposal.title, 50),
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        HtmlWidget(convertToHtml(proposal.description)),
                      ],
                    ),
                  ),
                  DataCell(
                    Tooltip(
                      message: getAverageScore(total).toString(),
                      child: getAverageEmoji(total),
                    ),
                  ),
                  DataCell(Text(total.toStringAsFixed(2))),
                ],
              );
            }).toList(),
          ),
          const SizedBox(height: 16),
          if (!kIsWeb)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      localizations.processExportData,
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.file_download),
                          onPressed: exportMarkdown,
                        ),
                        IconButton(
                          icon: const Icon(Icons.image),
                          onPressed: exportImage,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
