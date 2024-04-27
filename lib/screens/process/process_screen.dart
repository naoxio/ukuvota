import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
import 'package:ukuvota/utils/process_utils.dart';
import 'package:ukuvota/widgets/layout/process_scaffold.dart';

class ProcessScreen extends StatefulWidget {
  final String processId;

  const ProcessScreen({Key? key, required this.processId}) : super(key: key);

  @override
  ProcessScreenState createState() => ProcessScreenState();
}

class ProcessScreenState extends State<ProcessScreen> {
  late Timer? _proposalTimer;
  late Timer? _votingTimer;

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ProcessDataProvider(),
      child: Consumer<ProcessDataProvider>(
        builder: (context, processDataProvider, _) {
          return FutureBuilder<Map<String, dynamic>?>(
            future: processDataProvider.fetchProcessData(widget.processId),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else {
                final process = processDataProvider.processData!;
                final expectedPath = getProcessUrl(process);

                if (expectedPath != ModalRoute.of(context)?.settings.name) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    context.go(expectedPath);
                  });
                }

                return ProcessScaffold(
                  process: process,
                  child: const Center(
                    child: Text('Process Details'),
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
  void initState() {
    super.initState();
    _setupTimers();
  }

  @override
  void dispose() {
    _proposalTimer?.cancel();
    _votingTimer?.cancel();
    super.dispose();
  }

  void _setupTimers() {
    final processDataProvider =
        Provider.of<ProcessDataProvider>(context, listen: false);
    final process = processDataProvider.processData!;

    final proposalStartDate =
        DateTime.fromMillisecondsSinceEpoch(process['proposalDates'][0]);
    final proposalEndDate =
        DateTime.fromMillisecondsSinceEpoch(process['proposalDates'][1]);
    final votingStartDate =
        DateTime.fromMillisecondsSinceEpoch(process['votingDates'][0]);

    final currentTime = DateTime.now();

    if (currentTime.isBefore(proposalStartDate)) {
      final timeUntilProposalStart = proposalStartDate.difference(currentTime);
      _proposalTimer = Timer(timeUntilProposalStart, () {
        context.go('/process/${widget.processId}/proposals');
      });
    } else if (currentTime.isAfter(proposalEndDate) &&
        currentTime.isBefore(votingStartDate)) {
      final timeUntilVotingStart = votingStartDate.difference(currentTime);
      _votingTimer = Timer(timeUntilVotingStart, () {
        context.go('/process/${widget.processId}/voting');
      });
    }
  }
}
