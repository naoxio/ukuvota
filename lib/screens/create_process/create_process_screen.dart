/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:ukuvota/scaffolds/setup_process_scaffold.dart';
import 'package:ukuvota/services/shared_setup_service.dart';
import 'package:ukuvota/utils/weighting_options.dart';
import 'package:ukuvota/widgets/quill_editor.dart';
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
  final SharedSetupService _sharedSetupService = SharedSetupService();
  String _selectedWeighting = '3';

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
    final processData = await _sharedSetupService.getProcessData();
    if (processData != null) {
      _showProcessDataModal(processData);
    }
  }

  void _showProcessDataModal(Map<String, dynamic> processData) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        final localizations = AppLocalizations.of(context)!;

        return AlertDialog(
          title: Text(localizations.existingProcessData),
          content: Text(localizations.existingProcessDataMessage),
          actions: [
            TextButton(
              onPressed: () {
                _sharedSetupService.clearProcessData();
                Navigator.of(context).pop();
              },
              child: Text(localizations.startNew),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                _continueExistingProcess(processData);
              },
              child: Text(localizations.continueExisting),
            ),
          ],
        );
      },
    ).then((value) {
      if (value == null) {
        _continueExistingProcess(processData);
      }
    });
  }

  void _continueExistingProcess(Map<String, dynamic> processData) {
    _loadExistingProcessData(processData);

    final mode = processData['mode'];
    if (mode == 'full') {
      context.go('/create/proposal-voting');
    } else if (mode == 'voting-only') {
      context.go('/create/voting-only');
    } else {
      context.go('/create');
    }
  }

  void _loadExistingProcessData(Map<String, dynamic> processData) {
    _titleController.text = processData['title'] ?? '';
    _controller.compose(Delta.fromJson(processData['content'] ?? <dynamic>[]),
        _controller.selection, ChangeSource.local);
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return SetupProcessScaffold(
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
              labelText: localizations.processTopic,
              border: const OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          QuillEditorWidget(
            controller: _controller,
            showBorder: true,
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
            value: _selectedWeighting,
            items: [
              for (final entry in weightingOptions.entries)
                DropdownMenuItem<String>(
                  value: entry.key,
                  child: Text(entry.value),
                ),
            ],
            onChanged: (value) {
              setState(() {
                _selectedWeighting = value!;
              });
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
                        _saveProcessData('full');
                        context.go('/create/proposal-voting');
                      },
                child: Text(localizations.processPhasesFull),
              ),
              ElevatedButton(
                onPressed: _isTitleEmpty
                    ? null
                    : () {
                        _saveProcessData('voting-only');
                        context.go('/create/voting-only');
                      },
                child: Text(localizations.processPhasesVoting),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _saveProcessData(String mode) async {
    final newProcessData = {
      'title': _titleController.text,
      'content': _controller.document.toDelta().toJson(),
      'weighting': _selectedWeighting,
      'mode': mode,
    };

    _sharedSetupService.saveProcessData(newProcessData);
  }
}
