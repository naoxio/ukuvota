import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/datetime/timezone_selector.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
import 'package:ukuvota/widgets/datetime/time_selector.dart';
import 'package:go_router/go_router.dart';

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
      setState(() {
        _proposalStartDate = processData['proposalStartDate'] != null
            ? DateTime.parse(processData['proposalStartDate'])
            : null;
        _proposalEndDate = processData['proposalEndDate'] != null
            ? DateTime.parse(processData['proposalEndDate'])
            : null;
        _votingStartDate = processData['proposalVotingStartDate'] != null
            ? DateTime.parse(processData['proposalVotingStartDate'])
            : null;
        _votingEndDate = processData['proposalVotingEndDate'] != null
            ? DateTime.parse(processData['proposalVotingEndDate'])
            : null;
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
                Text(
                  localizations.phasesProposalTitle,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TimeSelector(
                  phase: 'proposal',
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
                    });
                  },
                ),
                const SizedBox(height: 20),
                TimeZoneSelector(
                  onTimeZoneChanged: (timeZone) {
                    setState(() {
                      _selectedTimeZone = timeZone;
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
