// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/services/shared_process_service.dart';
import 'package:ukuvota/services/shared_setup_service.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/utils/date_utils.dart';
import 'package:ukuvota/scaffolds/main_scaffold.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:uuid/uuid.dart';

class ReviewScreen extends StatefulWidget {
  const ReviewScreen({Key? key}) : super(key: key);

  @override
  ReviewScreenState createState() => ReviewScreenState();
}

class ReviewScreenState extends State<ReviewScreen> {
  final SharedSetupService _sharedSetupService = SharedSetupService();
  final ProcessDataService _processDataService = ProcessDataService();
  bool _isLoading = false;

  String? _title;
  String? _descriptionContent;
  DateTime? _proposalStartDate;
  DateTime? _proposalEndDate;
  DateTime? _proposalVotingStartDate;
  DateTime? _proposalVotingEndDate;
  DateTime? _votingOnlyStartDate;
  DateTime? _votingOnlyEndDate;
  List<Proposal> _proposals = [];
  String? _timezone;
  String? _weighting;
  String? _mode;

  @override
  void initState() {
    super.initState();

    _loadProcessData();
  }

  Future<void> _loadProcessData() async {
    final processData = await _sharedSetupService.getProcessData();
    if (processData != null) {
      setState(() {
        _title = processData['title'];
        _descriptionContent = processData['descriptionContent'];
        _timezone = processData['timezone'] ?? tz.local.name;
        _weighting = processData['weighting'];

        _mode = processData['mode'];
        if (_mode == 'full') {
          _proposalStartDate = processData['proposalStartDate'] != null
              ? DateTime.parse(processData['proposalStartDate'])
              : null;
          _proposalEndDate = processData['proposalEndDate'] != null
              ? DateTime.parse(processData['proposalEndDate'])
              : null;
          _proposalVotingStartDate =
              processData['proposalVotingStartDate'] != null
                  ? DateTime.parse(processData['proposalVotingStartDate'])
                  : null;
          _proposalVotingEndDate = processData['proposalVotingEndDate'] != null
              ? DateTime.parse(processData['proposalVotingEndDate'])
              : null;
        } else if (_mode == 'voting-only') {
          _votingOnlyStartDate = processData['votingOnlyStartDate'] != null
              ? DateTime.parse(processData['votingOnlyStartDate'])
              : null;
          _votingOnlyEndDate = processData['votingOnlyEndDate'] != null
              ? DateTime.parse(processData['votingOnlyEndDate'])
              : null;

          _proposals = processData['proposals'] != null
              ? List<Map<String, dynamic>>.from(processData['proposals'])
                  .map((proposalData) => Proposal.fromJson(proposalData))
                  .toList()
              : [];
        }
      });
    }
  }

  Future<void> _startProcess() async {
    final localizations = AppLocalizations.of(context)!;

    setState(() {
      _isLoading = true;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(localizations.processStarting),
        duration: const Duration(seconds: 2),
      ),
    );
    try {
      String processId = const Uuid().v4();

      Map<String, dynamic> processData = {
        '_id': processId,
        'title': _title,
        'description': _descriptionContent,
        'weighting': _weighting,
        'timezone': _timezone,
        'proposals': _proposals.map((proposal) => proposal.toJson()).toList(),
      };

      // Conditionally add dates based on the mode
      if (_mode == 'full') {
        processData['proposalDates'] = [
          _proposalStartDate?.millisecondsSinceEpoch,
          _proposalEndDate?.millisecondsSinceEpoch
        ];
        processData['votingDates'] = [
          _proposalVotingStartDate?.millisecondsSinceEpoch,
          _proposalVotingEndDate?.millisecondsSinceEpoch
        ];
      } else if (_mode == 'voting-only') {
        processData['proposalDates'] = null;
        processData['votingDates'] = [
          _votingOnlyStartDate?.millisecondsSinceEpoch,
          _votingOnlyEndDate?.millisecondsSinceEpoch
        ];
      }

      await _processDataService.createProcess(processId, processData);
      await _sharedSetupService.clearProcessData();

      await SharedProcessService().addUUID(processId);

      context.go('/process/$processId');
    } catch (error) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Failed to start the process. Please try again.'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return MainScaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (_title != null)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      localizations.processTopic,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    Text(_title!),
                    const SizedBox(height: 16),
                    if (_descriptionContent != null)
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            localizations.processTopic,
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 8),
                          Text(_title!),
                          const SizedBox(height: 16),
                          HtmlWidget(convertToHtml(_descriptionContent!)),
                        ],
                      ),
                  ],
                ),
              const SizedBox(height: 24),
              if (_weighting != null)
                Text(
                  '${localizations.processWeighting}: $_weighting',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              const SizedBox(height: 24),
              Row(
                children: [
                  if (_proposalStartDate != null && _proposalEndDate != null)
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            localizations.phasesProposalTitle,
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '${localizations.phasesStartAt}: ${prettyFormatInTimezone(_proposalStartDate!, _timezone!)}',
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${localizations.phasesEndsAt}: ${prettyFormatInTimezone(_proposalEndDate!, _timezone!)}',
                          ),
                        ],
                      ),
                    ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          localizations.phasesVotingTitle,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 8),
                        if (_proposalVotingStartDate != null)
                          Text(
                            '${localizations.phasesStartAt}: ${prettyFormatInTimezone(_proposalVotingStartDate!, _timezone!)}',
                          ),
                        if (_proposalVotingEndDate != null)
                          Text(
                            '${localizations.phasesEndsAt}: ${prettyFormatInTimezone(_proposalVotingEndDate!, _timezone!)}',
                          ),
                        if (_votingOnlyStartDate != null)
                          Text(
                            '${localizations.phasesStartAt}: ${prettyFormatInTimezone(_votingOnlyStartDate!, _timezone!)}',
                          ),
                        if (_votingOnlyEndDate != null)
                          Text(
                            '${localizations.phasesEndsAt}: ${prettyFormatInTimezone(_votingOnlyEndDate!, _timezone!)}',
                          ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Text(
                '${localizations.setupTimezone}: $_timezone',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 24),
              if (_proposals.isNotEmpty)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      localizations.processProposals,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 16),
                    ListView.separated(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _proposals.length,
                      separatorBuilder: (context, index) =>
                          const SizedBox(height: 16),
                      itemBuilder: (context, index) {
                        final proposal = _proposals[index];
                        return Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.grey[300]!),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                proposal.title,
                                style: Theme.of(context).textTheme.titleMedium,
                              ),
                              const SizedBox(height: 8),
                              HtmlWidget(convertToHtml(proposal.description)),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              const SizedBox(height: 32),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      if (_mode == 'voting-only') {
                        context.go('/create/voting-only');
                      } else {
                        context.go('/create/proposal-voting');
                      }
                    },
                    child: Text(localizations.buttonBack),
                  ),
                  ElevatedButton(
                    onPressed: _isLoading
                        ? null
                        : () {
                            _startProcess();
                          },
                    child: _isLoading
                        ? const CircularProgressIndicator()
                        : Text(localizations.buttonStart),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
