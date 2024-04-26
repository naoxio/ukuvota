import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/datetime/timezone_selector.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
import 'package:ukuvota/widgets/datetime/time_selector.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/utils/timezone_util.dart';

import 'package:timezone/timezone.dart' as tz;

class ProposalVotingScreen extends StatefulWidget {
  const ProposalVotingScreen({Key? key}) : super(key: key);

  @override
  ProposalVotingScreenState createState() => ProposalVotingScreenState();
}

class ProposalVotingScreenState extends State<ProposalVotingScreen> {
  final ProcessDataService _processDataService = ProcessDataService();

  DateTime? _proposalStartDate;
  DateTime? _proposalEndDate;
  DateTime? _votingStartDate;
  DateTime? _votingEndDate;
  String? _selectedTimeZone;

  @override
  void initState() {
    super.initState();
    _loadProcessData();
  }

  Future<void> _loadProcessData() async {
    final processData = await _processDataService.getProcessData();
    if (processData != null) {
      DateTime now = DateTime.now();
      DateTime proposalStartDate = processData['proposalStartDate'] != null
          ? DateTime.parse(processData['proposalStartDate'])
          : now;
      DateTime proposalEndDate = processData['proposalEndDate'] != null
          ? DateTime.parse(processData['proposalEndDate'])
          : now.add(const Duration(hours: 1));
      DateTime votingStartDate = processData['proposalVotingStartDate'] != null
          ? DateTime.parse(processData['proposalVotingStartDate'])
          : now.add(const Duration(hours: 1));
      DateTime votingEndDate = processData['proposalVotingEndDate'] != null
          ? DateTime.parse(processData['proposalVotingEndDate'])
          : now.add(const Duration(hours: 2));

      if (proposalStartDate.isBefore(now)) {
        Duration difference = now.difference(proposalStartDate);
        proposalStartDate = now;
        proposalEndDate = proposalEndDate.add(difference);
        votingStartDate = votingStartDate.add(difference);
        votingEndDate = votingEndDate.add(difference);
      }

      String selectedTimeZone =
          processData['timezone'] ?? await getCurrentTimeZone();
      setState(() {
        _proposalStartDate = proposalStartDate;
        _proposalEndDate = proposalEndDate;
        _votingStartDate = votingStartDate;
        _votingEndDate = votingEndDate;
        _selectedTimeZone = selectedTimeZone;
        tz.setLocalLocation(tz.getLocation(_selectedTimeZone!));
      });
    }
  }

  void _saveProcessData() {
    final processData = {
      'proposalStartDate': _proposalStartDate?.toIso8601String() ??
          DateTime.now().toIso8601String(),
      'proposalEndDate': _proposalEndDate?.toIso8601String() ??
          DateTime.now().add(const Duration(hours: 1)).toIso8601String(),
      'proposalVotingStartDate': _votingStartDate?.toIso8601String() ??
          DateTime.now().add(const Duration(hours: 1)).toIso8601String(),
      'proposalVotingEndDate': _votingEndDate?.toIso8601String() ??
          DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
      'timezone': _selectedTimeZone,
    };
    _processDataService.saveProcessData(processData);
  }

  void _updateVotingDates() {
    if (_proposalEndDate != null &&
        _votingStartDate != null &&
        _votingEndDate != null) {
      Duration votingDuration = _votingEndDate!.difference(_votingStartDate!);
      setState(() {
        _votingStartDate = _proposalEndDate;
        _votingEndDate = _votingStartDate!.add(votingDuration);
      });
    }
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
                  localizations.setupTimeLeftHeading,
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
                Text(
                  localizations.phasesProposalTitle,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TimeSelector(
                  phase: 'proposal',
                  selectedTimeZone: _selectedTimeZone,
                  startDate: _proposalStartDate ?? DateTime.now(),
                  endDate: _proposalEndDate ??
                      DateTime.now().add(const Duration(hours: 1)),
                  startMinDate: DateTime.now(),
                  onStartDateChanged: (DateTime date) {
                    setState(() {
                      _proposalStartDate = date;
                    });
                  },
                  onEndDateChanged: (DateTime date) {
                    setState(() {
                      _proposalEndDate = date;
                      _updateVotingDates();
                    });
                  },
                ),
                const SizedBox(height: 20),
                Text(
                  localizations.phasesVotingTitle,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TimeSelector(
                  phase: 'voting',
                  selectedTimeZone: _selectedTimeZone,
                  startDate: _votingStartDate ??
                      DateTime.now().add(const Duration(hours: 1)),
                  endDate: _votingEndDate ??
                      DateTime.now().add(const Duration(hours: 2)),
                  startMinDate: DateTime.now().add(const Duration(hours: 1)),
                  onStartDateChanged: (DateTime date) {
                    setState(() {
                      _votingStartDate = date;
                    });
                  },
                  onEndDateChanged: (DateTime date) {
                    setState(() {
                      _votingEndDate = date;
                    });
                  },
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
                      onPressed: () {
                        _saveProcessData();
                        context.go('/create/review');
                      },
                      child: Text(localizations.buttonContinue),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
