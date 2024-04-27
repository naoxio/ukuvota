// file: lib/widgets/process/proposals_list.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/create_proposal_element.dart';
import 'package:ukuvota/utils/proposal_templates.dart';
import 'package:uuid/uuid.dart';

class ProposalsList extends StatefulWidget {
  final bool isSetup;
  final List<Proposal> proposals;
  final Function(List<Proposal>) onProposalsUpdated;

  const ProposalsList({
    Key? key,
    required this.isSetup,
    required this.proposals,
    required this.onProposalsUpdated,
  }) : super(key: key);

  @override
  ProposalsListState createState() => ProposalsListState();
}

class ProposalsListState extends State<ProposalsList> {
  late List<Proposal> _proposals;

  @override
  void initState() {
    super.initState();
    _proposals = List.from(widget.proposals);
    if (_proposals.isNotEmpty) {
      for (var proposal in _proposals) {
        proposal.editing = true;
      }
    }
  }

  @override
  void didUpdateWidget(covariant ProposalsList oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.proposals != oldWidget.proposals) {
      _proposals = List<Proposal>.from(widget.proposals);
    }
  }

  void _addProposal() {
    final uniqueId = const Uuid().v4();
    final newProposal = Proposal(id: uniqueId, title: '', description: '');
    setState(() {
      _proposals.add(newProposal);
    });
    widget.onProposalsUpdated(_proposals);
  }

  void _deleteProposal(String id) {
    setState(() {
      _proposals.removeWhere((proposal) => proposal.id == id);
    });
    widget.onProposalsUpdated(_proposals);
  }

  void _updateProposal(Proposal updatedProposal) {
    setState(() {
      final index = _proposals
          .indexWhere((proposal) => proposal.id == updatedProposal.id);
      if (index != -1) {
        _proposals[index] = updatedProposal;
      }
    });
    widget.onProposalsUpdated(_proposals);
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return Column(
      children: [
        if (_proposals.isNotEmpty)
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _proposals.length,
            itemBuilder: (context, index) {
              final proposal = _proposals[index];
              return createProposalElement(
                proposal,
                localizations,
                widget.isSetup,
                onDelete: () => _deleteProposal(proposal.id),
                onUpdate: (updatedProposal) => _updateProposal(updatedProposal),
              );
            },
          )
        else
          Text(localizations.noProposalsFound),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _addProposal,
              child: Text(localizations.addProposal),
            ),
            const SizedBox(width: 16),
            PopupMenuButton<Proposal>(
              itemBuilder: (context) => exampleProposals(localizations)
                  .map((proposal) => PopupMenuItem<Proposal>(
                        value: proposal,
                        child: ListTile(
                          title: Text(proposal.title),
                          subtitle: Text(proposal.description),
                        ),
                      ))
                  .toList(),
              onSelected: (selectedProposal) {
                final uniqueId = const Uuid().v4();
                final delta = Delta()..insert(selectedProposal.description);

                print(delta);
                print(jsonEncode(delta.toJson()));

                final newProposal = Proposal(
                  id: uniqueId,
                  title: selectedProposal.title,
                  description: jsonEncode(delta.toJson()),
                );
                setState(() {
                  _proposals.add(newProposal);
                });
                widget.onProposalsUpdated(_proposals);
              },
              child: Text(localizations.addProposalTemplate),
            ),
          ],
        ),
      ],
    );
  }
}
