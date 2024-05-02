/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/widgets/quill_editor.dart';
import 'package:ukuvota/utils/proposal_utils.dart';

Widget createProposalElement(
  Proposal proposal,
  AppLocalizations localizations,
  bool isSetup, {
  required bool isEditing,
  VoidCallback? onDelete,
  Function(Proposal)? onUpdate,
  VoidCallback? onToggleEditing,
  String? processId,
}) {
  final titleController = TextEditingController(text: proposal.title);
  final descriptionController = QuillController(
    document: proposal.description.isNotEmpty
        ? Document.fromJson(jsonDecode(proposal.description))
        : Document(),
    selection: const TextSelection.collapsed(offset: 0),
  );

  void toggleEditMode() {
    if (onToggleEditing != null) {
      onToggleEditing();
    }
  }

  void saveProposal() {
    proposal.title = titleController.text;
    proposal.description =
        jsonEncode(descriptionController.document.toDelta().toJson());
    if (onUpdate != null) {
      onUpdate(proposal);
    }
    if (!isSetup && processId != null) {
      final proposalRef = FirebaseDatabase.instance
          .ref()
          .child('process/$processId/proposals/${proposal.id}');
      proposalRef.update({
        'title': proposal.title,
        'description': proposal.description,
      }).then((_) {
        toggleEditMode();
      }).catchError((error) {
        print('Error updating proposal: $error');
      });
    } else {
      toggleEditMode();
    }
  }

  void deleteProposal() {
    if (onDelete != null) {
      onDelete();
    }
    if (!isSetup && processId != null) {
      final proposalRef = FirebaseDatabase.instance
          .ref()
          .child('process/$processId/proposals/${proposal.id}');
      proposalRef.remove();
    }
  }

  if (!isSetup && processId != null) {
    final proposalRef = FirebaseDatabase.instance
        .ref()
        .child('process/$processId/proposals/${proposal.id}');
    proposalRef.onValue.listen((event) {
      final snapshot = event.snapshot;
      if (snapshot.exists) {
        final data = snapshot.value;
        if (data is Map<dynamic, dynamic>) {
          final jsonData = Map<String, dynamic>.from(data);
          try {
            final updatedProposal = Proposal.fromJson(jsonData);
            titleController.text = updatedProposal.title;
            descriptionController.document =
                Document.fromJson(jsonDecode(updatedProposal.description));
          } catch (e) {
            // Handle the error, e.g., display an error message or use default values
          }
        }
      }
    });
  }

  return Card(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (!isEditing)
          ListTile(
            title: Text(proposal.title),
            subtitle: HtmlWidget(convertToHtml(proposal.description)),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: toggleEditMode,
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
                QuillEditorWidget(
                  controller: descriptionController,
                  sharedConfigurations: const QuillSharedConfigurations(),
                  readOnly: false,
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: toggleEditMode,
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
