import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
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
  final ProcessDataService _processDataService = ProcessDataService();

  @override
  void initState() {
    super.initState();
    _controller = QuillController.basic();
    _titleController = TextEditingController();
    _titleController.addListener(_checkTitleEmpty);
    _loadProcessData();
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

  Future<void> _loadProcessData() async {
    final processData = await _processDataService.getProcessData();
    if (processData != null) {
      _showProcessDataModal(processData);
    }
  }

  void _showProcessDataModal(Map<String, dynamic> processData) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Existing Process Data'),
          content: const Text(
              'You have existing process data. Do you want to start a new process or continue the existing one?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Start New'),
            ),
            TextButton(
              onPressed: () {
                _loadExistingProcessData(processData);
                Navigator.of(context).pop();
              },
              child: const Text('Continue Existing'),
            ),
          ],
        );
      },
    );
  }

  void _loadExistingProcessData(Map<String, dynamic> processData) {
    _titleController.text = processData['title'] ?? '';
    _controller.compose(Delta.fromJson(processData['content'] ?? <dynamic>[]),
        _controller.selection, ChangeSource.local);
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
                  value: 'x1',
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
                  onChanged: (value) {},
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
                              _saveProcessData();
                              context.go('/create/proposal-voting');
                            },
                      child: Text(localizations.processPhasesFull),
                    ),
                    ElevatedButton(
                      onPressed: _isTitleEmpty
                          ? null
                          : () {
                              _saveProcessData();
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

  Future<void> _saveProcessData() async {
    final existingProcessData =
        await _processDataService.getProcessData() ?? {};
    final newProcessData = {
      'title': _titleController.text,
      'content': _controller.document.toDelta().toJson(),
    };

    final mergedProcessData = {
      ...existingProcessData,
      ...newProcessData,
    };

    _processDataService.saveProcessData(mergedProcessData);
  }
}
