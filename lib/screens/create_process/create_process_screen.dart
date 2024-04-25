import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:ukuvota/widgets/ui/custom_app_bar.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/widgets/ui/custom_drawer.dart';
import 'package:ukuvota/widgets/ui/custom_scaffold.dart';
import 'package:ukuvota/widgets/quill_editor_widget.dart';
import 'package:go_router/go_router.dart';

class CreateProcessScreen extends StatefulWidget {
  const CreateProcessScreen({Key? key}) : super(key: key);

  @override
  CreateProcessScreenState createState() => CreateProcessScreenState();
}

class CreateProcessScreenState extends State<CreateProcessScreen> {
  late QuillController _controller;
  late TextEditingController _titleController;
  bool _isTitleEmpty = true;

  @override
  void initState() {
    super.initState();
    _controller = QuillController.basic();
    _titleController = TextEditingController();
    _titleController.addListener(_checkTitleEmpty);
  }

  @override
  void dispose() {
    _controller.dispose();
    _titleController.dispose();
    super.dispose();
  }

  void _checkTitleEmpty() {
    setState(() {
      _isTitleEmpty = _titleController.text.isEmpty;
    });
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return CustomScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                const SizedBox(height: 20),
                Text(
                  localizations.setupProcess,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: _titleController,
                  decoration: InputDecoration(
                    labelText: localizations.processTitle,
                    hintText: localizations.processTopic,
                    border: const OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 20),
                QuillEditorWidget(
                  controller: _controller,
                  sharedConfigurations: QuillSharedConfigurations(
                    locale: Locale(localizations.localeName),
                  ),
                  height: 200,
                ),
                const SizedBox(height: 20),
                DropdownButtonFormField<String>(
                  decoration: InputDecoration(
                    labelText: localizations.processWeighting,
                    border: const OutlineInputBorder(),
                  ),
                  value: 'x1', // Default value
                  items: [
                    for (final option in [
                      'x1',
                      'x2',
                      'x3',
                      'x4',
                      'x5',
                      'x6',
                      '∞'
                    ])
                      DropdownMenuItem<String>(
                        value: option,
                        child: Text(option),
                      ),
                  ],
                  onChanged: (value) {
                    // Handle value change
                  },
                ),
                const SizedBox(height: 20),
                Wrap(
                  alignment: WrapAlignment.spaceAround,
                  spacing: 8.0,
                  runSpacing: 10.0,
                  children: [
                    ElevatedButton(
                      onPressed: _isTitleEmpty
                          ? null
                          : () {
                              context.go('/create/proposal-voting');
                            },
                      child: Text(localizations.processPhasesFull),
                    ),
                    ElevatedButton(
                      onPressed: _isTitleEmpty
                          ? null
                          : () {
                              context.go('/create/voting-only');
                            },
                      child: Text(localizations.processPhasesVoting),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
