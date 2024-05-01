/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:async';
import 'dart:convert';

import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/create_proposal_element.dart';
import 'package:ukuvota/utils/proposal_templates.dart';
import 'package:uuid/uuid.dart';

class ProposalsList extends StatefulWidget {
  final bool isSetup;
  final List<Proposal>? proposals;
  final Function(List<Proposal>) onProposalsUpdated;
  final String? processId;
  const ProposalsList({
    Key? key,
    this.isSetup = false,
    required this.proposals,
    required this.onProposalsUpdated,
    this.processId,
  }) : super(key: key);

  @override
  ProposalsListState createState() => ProposalsListState();
}

class ProposalsListState extends State<ProposalsList> {
  late List<Proposal> _proposals;
  DatabaseReference? _proposalsRef;

  StreamSubscription<DatabaseEvent>? _proposalsSubscription;
  Set<String> _editingProposalIds = Set();

  @override
  void initState() {
    super.initState();
    _proposals = widget.proposals ?? [];

    if (!widget.isSetup && widget.processId != null) {
      _proposalsRef = FirebaseDatabase.instance
          .ref()
          .child('process/${widget.processId}/proposals');
      _proposalsSubscription = _proposalsRef!.onValue.listen((event) {
        final proposals = <Proposal>[];
        final map = event.snapshot.value;
        if (map != null) {
          if (map is Map<dynamic, dynamic>) {
            map.forEach((key, value) {
              if (value is Map<dynamic, dynamic>) {
                final proposal =
                    Proposal.fromJson(Map<String, dynamic>.from(value));
                proposals.add(proposal);
              }
            });
          }
        }
        setState(() {
          _proposals = proposals;
        });
      });
    }
  }

  @override
  void dispose() {
    _proposalsSubscription?.cancel();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant ProposalsList oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.proposals != oldWidget.proposals) {
      _proposals = widget.proposals ?? [];
    }
  }

  void _addProposal() {
    final uniqueId = const Uuid().v4();
    final newProposal = Proposal(id: uniqueId, title: '', description: '');
    if (_proposalsRef != null) {
      _proposalsRef!.child(uniqueId).set(newProposal.toJson());
    } else {
      setState(() {
        _proposals.add(newProposal);
      });
      widget.onProposalsUpdated(_proposals);
    }
  }

  void _deleteProposal(String id) {
    if (_proposalsRef != null) {
      _proposalsRef!.child(id).remove();
    } else {
      setState(() {
        _proposals.removeWhere((proposal) => proposal.id == id);
      });
      widget.onProposalsUpdated(_proposals);
    }
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

  void _toggleEditing(String proposalId) {
    setState(() {
      if (_editingProposalIds.contains(proposalId)) {
        _editingProposalIds.remove(proposalId);
      } else {
        _editingProposalIds.add(proposalId);
      }
    });
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
              final isEditing = _editingProposalIds.contains(proposal.id);
              return createProposalElement(
                proposal,
                localizations,
                widget.isSetup,
                isEditing: isEditing,
                onDelete: () => _deleteProposal(proposal.id),
                onUpdate: (updatedProposal) => _updateProposal(updatedProposal),
                onToggleEditing: () => _toggleEditing(proposal.id),
                processId: widget.processId,
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

                final newProposal = Proposal(
                  id: uniqueId,
                  title: selectedProposal.title,
                  description: jsonEncode(delta.toJson()),
                );

                setState(() {
                  _proposals.add(newProposal);
                });

                if (!widget.isSetup && widget.processId != null) {
                  final proposalRef = FirebaseDatabase.instance
                      .ref()
                      .child('process/${widget.processId}/proposals/$uniqueId');
                  proposalRef.set({
                    'id': uniqueId,
                    'title': newProposal.title,
                    'description': newProposal.description,
                  });
                }

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
