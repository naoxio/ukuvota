import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:ukuvota/utils/export_utils.dart';

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
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    selectedVoters = widget.process.voters ?? [];
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
    final emojiIndex = average.round() + 3;
    return SvgPicture.asset('emojis/${emojiNames[emojiIndex]}.svg');
  }

  void updateTable() {
    setState(() {
      // Update the table based on the selected voters
      // You can use the getTotal and getAverageScore methods to calculate the values
    });
  }

  void exportMarkdown() {
    final markdown = generateMarkdown(widget.process, selectedVoters);
    saveMarkdown(markdown, '${widget.process.title}.md');
  }

  void exportImage() {
    // Implement the logic to export the results as an image
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final proposals = widget.process.proposals ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (selectedVoters.isEmpty)
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
                    _buildResultsTab(localizations, proposals),
                    _buildVotersTab(localizations, proposals),
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

    Set<Voter> allVoters = widget.process.voters!.toSet();
    Set<Voter> selectedVotersSet = allVoters.toSet();
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${localizations.processVoters} (${selectedVoters.length}):',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Wrap(
            children: allVoters.map((voter) {
              return Padding(
                padding: const EdgeInsets.all(4),
                child: FilterChip(
                  label: Text(voter.name),
                  selected: selectedVotersSet.contains(voter),
                  onSelected: (selected) {
                    setState(() {
                      if (selected) {
                        selectedVotersSet.add(voter);
                      } else {
                        selectedVotersSet.remove(voter);
                      }
                      selectedVoters = selectedVotersSet.toList();
                      updateTable();
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
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    localizations.processExportData,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
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

  Widget _buildVotersTab(
      AppLocalizations localizations, List<Proposal> proposals) {
    final sortedProposals = proposals.toList()
      ..sort((a, b) => a.title.compareTo(b.title));

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: [
          DataColumn(label: Text(localizations.processVoter)),
          ...sortedProposals.map((proposal) {
            return DataColumn(label: Text(truncateString(proposal.title, 20)));
          }).toList(),
        ],
        rows: selectedVoters.map((voter) {
          return DataRow(
            cells: [
              DataCell(Text(voter.name)),
              ...sortedProposals.map((proposal) {
                final vote = voter.votes.firstWhere(
                  (vote) => vote.proposalId == proposal.id,
                  orElse: () => Vote(proposalId: '', vote: 0),
                );
                return DataCell(Text(vote.vote.toString()));
              }).toList(),
            ],
          );
        }).toList(),
      ),
    );
  }
}
