// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
import 'package:ukuvota/utils/process_utils.dart';
import 'package:ukuvota/widgets/layout/process_scaffold.dart';
import 'package:ukuvota/widgets/process/results_card.dart';

class ResultsScreen extends StatefulWidget {
  final String processId;

  const ResultsScreen({Key? key, required this.processId}) : super(key: key);

  @override
  ResultsScreenState createState() => ResultsScreenState();
}

class ResultsScreenState extends State<ResultsScreen> {
  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

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
                final expectedPath = getProcessUrl(process);

                if (expectedPath != ModalRoute.of(context)?.settings.name) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    context.go(expectedPath);
                  });
                }

                return ProcessScaffold(
                  process: process,
                  child: ResultsCard(process: process),
                );
              }
            },
          );
        },
      ),
    );
  }
}
