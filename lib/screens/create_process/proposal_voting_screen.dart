import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
import 'package:ukuvota/widgets/datetime/time_selector.dart';
import 'package:go_router/go_router.dart';

class ProposalVotingScreen extends StatefulWidget {
  const ProposalVotingScreen({Key? key}) : super(key: key);

  @override
  _ProposalVotingScreenState createState() => _ProposalVotingScreenState();
}

class _ProposalVotingScreenState extends State<ProposalVotingScreen> {
  final ProcessDataService _processDataService = ProcessDataService();

  DateTime? _proposalStartDate;
  DateTime? _proposalEndDate;
  DateTime? _votingStartDate;
  DateTime? _votingEndDate;

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
        _votingStartDate = processData['votingStartDate'] != null
            ? DateTime.parse(processData['votingStartDate'])
            : null;
        _votingEndDate = processData['votingEndDate'] != null
            ? DateTime.parse(processData['votingEndDate'])
            : null;
        print(_proposalStartDate);
        print(_proposalEndDate);
        print(processData);
      });
    }
  }

  void _saveProcessData() {
    final processData = {
      'proposalStartDate': _proposalStartDate?.toIso8601String(),
      'proposalEndDate': _proposalEndDate?.toIso8601String(),
      'votingStartDate': _votingStartDate?.toIso8601String(),
      'votingEndDate': _votingEndDate?.toIso8601String(),
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
                        // Logic to go forward
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
