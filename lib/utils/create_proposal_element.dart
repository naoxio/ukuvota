// file: lib/utils/create_proposal_element.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/utils/proposal_utils.dart';

Widget createProposalElement(
  Proposal proposal,
  AppLocalizations localizations,
  bool isSetup, {
  VoidCallback? onDelete,
  Function(Proposal)? onUpdate,
}) {
  final titleController = TextEditingController(text: proposal.title);
  final descriptionController =
      TextEditingController(text: proposal.description);

  void toggleEditMode(bool editing) {
    proposal.editing = editing;
    if (onUpdate != null) {
      onUpdate(proposal);
    }
  }

  void saveProposal() {
    proposal.title = titleController.text;
    proposal.description = descriptionController.text;
    toggleEditMode(false);
  }

  void deleteProposal() {
    if (onDelete != null) {
      onDelete();
    }
  }

  return Card(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (!proposal.editing)
          ListTile(
            title: Text(proposal.title),
            subtitle: Text(truncateDescription(proposal.description, 100)),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => toggleEditMode(true),
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: deleteProposal,
                ),
              ],
            ),
          )
        else
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: titleController,
                  decoration: InputDecoration(
                    labelText: localizations.processTitle,
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: descriptionController,
                  maxLines: null,
                  decoration: InputDecoration(
                    labelText: localizations.processDescription,
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => toggleEditMode(false),
                      child: Text(localizations.buttonCancel),
                    ),
                    ElevatedButton(
                      onPressed: saveProposal,
                      child: Text(localizations.buttonSave),
                    ),
                  ],
                ),
              ],
            ),
          ),
      ],
    ),
  );
}
