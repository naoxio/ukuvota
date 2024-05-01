/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/main_scaffold.dart';
import 'package:ukuvota/services/process_data_service.dart';
import 'package:ukuvota/services/shared_process_service.dart';
import 'package:ukuvota/widgets/process/process_info.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return MainScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 800),
              child: Column(
                children: [
                  const SizedBox(height: 10),
                  FutureBuilder<List<String>>(
                    future: SharedProcessService().fetchUUIDs(),
                    builder: (context, snapshot) {
                      final uuids = snapshot.data ?? [];
                      return FutureBuilder<Map<String, Process>>(
                        future: ProcessDataService().fetchProcessesByIds(uuids),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return const CircularProgressIndicator();
                          }

                          final processes = snapshot.data ?? {};
                          final currentlyInProgress = <Process>[];
                          final completedProcesses = <Process>[];

                          final now = DateTime.now();
                          for (final process in processes.values) {
                            DateTime? votingEndTime;
                            DateTime? proposalEndTime;

                            if (process.votingDates.length == 2) {
                              votingEndTime =
                                  DateTime.fromMillisecondsSinceEpoch(
                                      process.votingDates[1]);
                            }

                            if (process.proposalDates != null &&
                                process.proposalDates!.length == 2) {
                              proposalEndTime =
                                  DateTime.fromMillisecondsSinceEpoch(
                                      process.proposalDates![1]);
                            }

                            if (votingEndTime != null &&
                                votingEndTime.isAfter(now)) {
                              currentlyInProgress.add(process);
                            } else if (proposalEndTime != null &&
                                proposalEndTime.isAfter(now)) {
                              currentlyInProgress.add(process);
                            } else {
                              completedProcesses.add(process);
                            }
                          }

                          return Column(
                            children: [
                              _buildSection(
                                localizations.currentlyInProgress,
                                currentlyInProgress,
                                emptyMessage:
                                    localizations.noProcessesInProgress,
                              ),
                              _buildSection(localizations.completedProcesses,
                                  completedProcesses,
                                  emptyMessage: localizations
                                      .completedProcessesEmptyMessage,
                                  skipCompleted: true),
                            ],
                          );
                        },
                      );
                    },
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      context.go('/create');
                    },
                    child: Text(localizations.startNewProcess),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<Process> processes,
      {String emptyMessage = '', bool skipCompleted = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 10),
        if (processes.isNotEmpty)
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.8,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
            ),
            itemCount: processes.length,
            itemBuilder: (context, index) {
              final process = processes[index];
              return MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: () async {
                    setState(() => _isLoading = true);
                    context.go('/process/${process.id}');
                  },
                  child: Stack(
                    children: [
                      Card(
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ProcessInfo(
                                  process: process,
                                  showSharePart: false,
                                  skipCompleted: skipCompleted,
                                  quickView: true),
                            ],
                          ),
                        ),
                      ),
                      if (_isLoading)
                        Positioned.fill(
                          child: Container(
                            color: Colors.black45,
                            child: const Center(
                              child: CircularProgressIndicator(),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              );
            },
          )
        else
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Text(
                  emptyMessage,
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.grey),
                ),
              ),
            ),
          ),
        const SizedBox(height: 20),
      ],
    );
  }
}
