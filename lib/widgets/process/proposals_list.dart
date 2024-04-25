// file: lib/widgets/process/proposals_list.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/create_proposal_element.dart';
import 'package:ukuvota/utils/proposal_templates.dart';
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:uuid/uuid.dart';

class ProposalsList extends StatefulWidget {
  final String? processId;
  final List<Proposal> proposals;
  final bool isSetup;

  const ProposalsList({
    Key? key,
    this.processId,
    this.proposals = const [],
    this.isSetup = false,
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

  void _addProposal() {
    final uniqueId = const Uuid().v4();
    final newProposal = Proposal(id: uniqueId, title: '', description: '');
    setState(() {
      _proposals.add(newProposal);
    });
    _notifyNewProposal(newProposal);
  }

  void _deleteProposal(String id) {
    setState(() {
      _proposals.removeWhere((proposal) => proposal.id == id);
    });
    _deleteProposalApi(id);
  }

  void _updateProposal(Proposal updatedProposal) {
    setState(() {
      final index = _proposals
          .indexWhere((proposal) => proposal.id == updatedProposal.id);
      if (index != -1) {
        _proposals[index] = updatedProposal;
      }
    });
    _updateProposalApi(updatedProposal);
  }

  void _notifyNewProposal(Proposal proposal) {}

  void _deleteProposalApi(String id) {}

  void _updateProposalApi(Proposal proposal) {}

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
        ElevatedButton(
          onPressed: _addProposal,
          child: Text(localizations.addProposal),
        ),
        const SizedBox(height: 8),
        PopupMenuButton<Proposal>(
          itemBuilder: (context) => exampleProposals(localizations)
              .map((proposal) => PopupMenuItem<Proposal>(
                    value: proposal,
                    child: ListTile(
                      title: Text(proposal.title),
                      subtitle:
                          Text(truncateDescription(proposal.description, 100)),
                    ),
                  ))
              .toList(),
          onSelected: (selectedProposal) {
            final uniqueId = const Uuid().v4();
            final newProposal = Proposal(
              id: uniqueId,
              title: selectedProposal.title,
              description: selectedProposal.description,
            );
            setState(() {
              _proposals.add(newProposal);
            });
            _notifyNewProposal(newProposal);
          },
          child: Text(localizations.addProposalTemplate),
        ),
      ],
    );
  }
}
