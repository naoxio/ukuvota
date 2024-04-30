/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';
import 'package:ukuvota/services/shared_setup_service.dart';
import 'package:ukuvota/widgets/datetime/timezone_selector.dart';
import 'package:ukuvota/scaffolds/main_scaffold.dart';
import 'package:ukuvota/widgets/datetime/time_selector.dart';
import 'package:ukuvota/widgets/process/proposals_list.dart';
import 'package:go_router/go_router.dart';

import 'package:ukuvota/utils/timezone_utils.dart';
import 'package:timezone/timezone.dart' as tz;

class VotingOnlyScreen extends StatefulWidget {
  const VotingOnlyScreen({Key? key}) : super(key: key);

  @override
  VotingOnlyScreenState createState() => VotingOnlyScreenState();
}

class VotingOnlyScreenState extends State<VotingOnlyScreen> {
  final SharedSetupService _sharedSetupService = SharedSetupService();

  DateTime? _votingOnlyStartDate;
  DateTime? _votingOnlyEndDate;
  String? _selectedTimeZone;

  List<Proposal> _proposals = [];

  @override
  void initState() {
    super.initState();
    _loadProcessData();
  }

  Future<void> _loadProcessData() async {
    final processData = await _sharedSetupService.getProcessData();

    if (processData != null) {
      String selectedTimeZone =
          processData['timezone'] ?? await getCurrentTimeZone();
      setState(() {
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
        _selectedTimeZone = selectedTimeZone;
        tz.setLocalLocation(tz.getLocation(_selectedTimeZone!));
      });
    }
  }

  bool _isProposalEmpty(Proposal proposal) {
    return proposal.title.isEmpty && proposal.description.isEmpty;
  }

  void _saveProcessData() {
    final processData = {
      'votingOnlyStartDate': _votingOnlyStartDate?.toIso8601String() ??
          DateTime.now().toIso8601String(),
      'votingOnlyEndDate': _votingOnlyEndDate?.toIso8601String() ??
          DateTime.now().add(const Duration(hours: 1)).toIso8601String(),
      'proposals': _proposals,
      'timezone': _selectedTimeZone,
    };
    _sharedSetupService.saveProcessData(processData);
  }

  void _updateProposals(List<Proposal> proposals) {
    setState(() {
      _proposals = proposals;
    });
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final hasEmptyProposals =
        _proposals.isNotEmpty && _proposals.any(_isProposalEmpty);

    return MainScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 800),
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  Text(
                    localizations.setupTimeLeftVotingHeading,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  _selectedTimeZone == null
                      ? const CircularProgressIndicator()
                      : TimeZoneSelector(
                          initialTimeZone: _selectedTimeZone,
                          onTimeZoneChanged: (timeZone) {
                            setState(() {
                              _selectedTimeZone = timeZone;
                            });
                          },
                        ),
                  const SizedBox(height: 20),
                  TimeSelector(
                    phase: 'voting',
                    startDate: _votingOnlyStartDate ?? DateTime.now(),
                    endDate: _votingOnlyEndDate ??
                        DateTime.now().add(const Duration(hours: 1)),
                    startMinDate: DateTime.now(),
                    hideTitle: true,
                    onStartDateChanged: (DateTime date) {
                      setState(() {
                        _votingOnlyStartDate = date;
                      });
                    },
                    onEndDateChanged: (DateTime date) {
                      setState(() {
                        _votingOnlyEndDate = date;
                      });
                    },
                  ),
                  const SizedBox(height: 20),
                  Text(
                    localizations.setupProposals,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 10),
                  ProposalsList(
                    isSetup: true,
                    proposals: _proposals,
                    onProposalsUpdated: _updateProposals,
                  ),
                  const SizedBox(height: 20),
                  if (_proposals.length < 2)
                    Text(
                      localizations.hintMinTwoProposals,
                      style: const TextStyle(color: Colors.orange),
                    )
                  else if (hasEmptyProposals)
                    Text(
                      localizations.hintProposalsNotEmpty,
                      style: const TextStyle(color: Colors.orange),
                    ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          _saveProcessData();
                          context.go('/create');
                        },
                        child: Text(localizations.buttonBack),
                      ),
                      ElevatedButton(
                        onPressed: _proposals.length >= 2 && !hasEmptyProposals
                            ? () {
                                _saveProcessData();
                                context.go('/create/review');
                              }
                            : null,
                        child: Text(localizations.buttonContinue),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
