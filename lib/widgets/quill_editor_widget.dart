import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';

class QuillEditorWidget extends StatelessWidget {
  final QuillController controller;
  final QuillSharedConfigurations sharedConfigurations;
  final double height;

  const QuillEditorWidget({
    Key? key,
    required this.controller,
    required this.sharedConfigurations,
    this.height = 200,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.grey,
          width: 1.0,
        ),
      ),
      child: Column(
        children: [
          QuillToolbar.simple(
            configurations: QuillSimpleToolbarConfigurations(
              controller: controller,
              multiRowsDisplay: true,
              toolbarIconAlignment: WrapAlignment.start,
              toolbarSectionSpacing: 0,
              fontFamilyValues: const {
                'Arial': 'Arial',
                'Courier New': 'Courier New',
                'Helvetica': 'Helvetica',
                'Times New Roman': 'Times New Roman',
              },
              showHeaderStyle: false,
              showAlignmentButtons: true,
              showDividers: true,
              showSubscript: false,
              showSuperscript: false,
              showSearchButton: false,
              showIndent: false,
              showInlineCode: false,
              showListCheck: false,
              fontSizesValues: const {
                'Small': '12',
                'Normal': '16',
                'Large': '20',
                'Huge': '24',
              },
            ),
          ),
          const Divider(
            height: 2,
          ),
          SizedBox(
            height: height,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: const BoxDecoration(),
              child: QuillEditor.basic(
                configurations: QuillEditorConfigurations(
                  controller: controller,
                  readOnly: false,
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
