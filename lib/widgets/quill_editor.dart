/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';

class QuillEditorWidget extends StatelessWidget {
  final QuillController controller;
  final QuillSharedConfigurations sharedConfigurations;
  final double height;
  final bool readOnly;
  final bool showBorder;

  const QuillEditorWidget({
    Key? key,
    required this.controller,
    required this.sharedConfigurations,
    this.height = 100,
    this.readOnly = false,
    this.showBorder = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: showBorder
          ? BoxDecoration(
              border: Border.all(
                color: Colors.grey,
                width: 1.0,
              ),
            )
          : null,
      child: Column(
        children: [
          if (!readOnly)
            QuillToolbar.simple(
              configurations: QuillSimpleToolbarConfigurations(
                  controller: controller,
                  showRedo: false,
                  showUndo: false,
                  multiRowsDisplay: true,
                  toolbarIconAlignment: WrapAlignment.start,
                  toolbarSectionSpacing: 0,
                  showFontFamily: false,
                  toolbarIconCrossAlignment: WrapCrossAlignment.center,
                  showHeaderStyle: false,
                  showFontSize: false,
                  showAlignmentButtons: true,
                  showDividers: true,
                  showSubscript: false,
                  showSuperscript: false,
                  showSearchButton: false,
                  showIndent: false,
                  showInlineCode: false,
                  showListCheck: false,
                  showJustifyAlignment: false),
            ),
          if (!readOnly) const Divider(height: 2),
          SizedBox(
            height: height,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: const BoxDecoration(),
              child: QuillEditor.basic(
                configurations: QuillEditorConfigurations(
                  controller: controller,
                  readOnly: readOnly,
                  sharedConfigurations: sharedConfigurations,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
