import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/utils/date_utils.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
import 'package:go_router/go_router.dart';
import 'package:vsc_quill_delta_to_html/vsc_quill_delta_to_html.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz;

class ReviewScreen extends StatefulWidget {
  const ReviewScreen({Key? key}) : super(key: key);

  @override
  _ReviewScreenState createState() => _ReviewScreenState();
}

class _ReviewScreenState extends State<ReviewScreen> {
  final ProcessDataService _processDataService = ProcessDataService();

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
  String? _descriptionHTML;

  @override
  void initState() {
    super.initState();

    _loadProcessData();
  }

  Future<void> _loadProcessData() async {
    final processData = await _processDataService.getProcessData();
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
        }

        _proposals = processData['proposals'] != null
            ? List<Map<String, dynamic>>.from(processData['proposals'])
                .map((proposalData) => Proposal.fromJson(proposalData))
                .toList()
            : [];
        if (_descriptionContent != null) {
          final deltaOps = jsonDecode(_descriptionContent!);
          final converter = QuillDeltaToHtmlConverter(
            deltaOps,
            ConverterOptions.forEmail(),
          );
          _descriptionHTML = converter.convert();
        }
      });
    }
    print(processData);
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return CustomScaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
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
                    if (_descriptionHTML != null)
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
                          HtmlWidget(_descriptionHTML!),
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
                      style: Theme.of(context).textTheme.headline6,
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
                                style: Theme.of(context).textTheme.subtitle1,
                              ),
                              const SizedBox(height: 8),
                              if (proposal.descriptionHtml != null)
                                HtmlWidget(proposal.descriptionHtml ?? ''),
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
                    onPressed: () {
                      // Logic to start the process
                    },
                    child: Text(localizations.buttonStart),
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
