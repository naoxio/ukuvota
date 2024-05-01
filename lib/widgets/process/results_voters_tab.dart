/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/utils/proposal_utils.dart';

class ResultsVotersTab extends StatelessWidget {
  final List<Voter> selectedVoters;
  final List<Proposal> proposals;

  const ResultsVotersTab({
    Key? key,
    required this.selectedVoters,
    required this.proposals,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
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
