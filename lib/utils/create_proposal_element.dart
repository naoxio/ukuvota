/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'dart:convert';
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
  VoidCallback? onDelete,
  Function(Proposal)? onUpdate,
}) {
  final titleController = TextEditingController(text: proposal.title);
  final descriptionController = QuillController(
    document: proposal.description.isNotEmpty
        ? Document.fromJson(jsonDecode(proposal.description))
        : Document(),
    selection: const TextSelection.collapsed(offset: 0),
  );

  void toggleEditMode(bool editing) {
    proposal.editing = editing;
    if (onUpdate != null) {
      onUpdate(proposal);
    }
  }

  void saveProposal() {
    proposal.title = titleController.text;
    proposal.description =
        jsonEncode(descriptionController.document.toDelta().toJson());
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
            subtitle: HtmlWidget(convertToHtml(proposal.description)),
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
