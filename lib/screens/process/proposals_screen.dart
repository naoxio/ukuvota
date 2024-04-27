import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
import 'package:ukuvota/utils/process_utils.dart';
import 'package:ukuvota/widgets/layout/process_scaffold.dart';
import 'package:ukuvota/widgets/process/proposals_list.dart';

class ProposalsScreen extends StatefulWidget {
  final String processId;
  const ProposalsScreen({Key? key, required this.processId}) : super(key: key);

  @override
  ProposalsScreenState createState() => ProposalsScreenState();
}

class ProposalsScreenState extends State<ProposalsScreen> {
  late String _endTime;

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ProcessDataProvider(),
      child: Consumer<ProcessDataProvider>(
        builder: (context, processDataProvider, _) {
          return FutureBuilder<Process?>(
            future: processDataProvider.fetchProcessData(widget.processId),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else {
                final process = processDataProvider.processData!;
                final proposals = process.proposals ?? [];
                _endTime = process.proposalDates![1] as String;

                final expectedPath = getProcessUrl(process);

                if (expectedPath != ModalRoute.of(context)?.settings.name) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    context.go(expectedPath);
                  });
                }

                return ProcessScaffold(
                  process: process,
                  child: Column(
                    children: [
                      ProposalsList(
                        isSetup: false,
                        processId: widget.processId,
                        proposals: proposals,
                        onProposalsUpdated: (proposal) {},
                      ),
                      const SizedBox(height: 16),
                      Text('End Time: $_endTime'),
                    ],
                  ),
                );
              }
            },
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _startTimer();
  }

  void _startTimer() {
    final endTimeDate = DateTime.parse(_endTime);
    final currentTime = DateTime.now();
    final timeLeft = endTimeDate.difference(currentTime);
    if (timeLeft.isNegative) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go('/process/${widget.processId}/results');
      });
    } else {
      Future.delayed(
        timeLeft.inMilliseconds > 1000 ? const Duration(seconds: 1) : timeLeft,
        _startTimer,
      );
    }
  }
}
