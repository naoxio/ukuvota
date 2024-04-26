import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/widgets/layout/main_layout.dart';
import 'package:ukuvota/widgets/datetime/time_selector.dart';
import 'package:ukuvota/widgets/process/proposals_list.dart';
import 'package:go_router/go_router.dart';

class VotingOnlyScreen extends StatefulWidget {
  const VotingOnlyScreen({Key? key}) : super(key: key);

  @override
  VotingOnlyScreenState createState() => VotingOnlyScreenState();
}

class VotingOnlyScreenState extends State<VotingOnlyScreen> {
  final ProcessDataService _processDataService = ProcessDataService();

  DateTime? _votingOnlyStartDate;
  DateTime? _votingOnlyEndDate;

  @override
  void initState() {
    super.initState();
    _loadProcessData();
  }

  Future<void> _loadProcessData() async {
    final processData = await _processDataService.getProcessData();
    if (processData != null) {
      setState(() {
        _votingOnlyStartDate = processData['votingOnlyStartDate'] != null
            ? DateTime.parse(processData['votingOnlyStartDate'])
            : null;
        _votingOnlyEndDate = processData['votingOnlyEndDate'] != null
            ? DateTime.parse(processData['votingOnlyEndDate'])
            : null;
        print(processData);
      });
    }
  }

  void _saveProcessData() {
    final processData = {
      'votingOnlyStartDate': _votingOnlyStartDate?.toIso8601String() ??
          DateTime.now().toIso8601String(),
      'votingOnlyEndDate': _votingOnlyEndDate?.toIso8601String() ??
          DateTime.now().add(const Duration(hours: 1)).toIso8601String(),
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
                  localizations.setupTimeLeftVotingHeading,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
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
                const ProposalsList(
                  isSetup: true,
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}