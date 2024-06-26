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
import 'package:ukuvota/services/dashboard_preferences.dart';
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
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                FutureBuilder<List<String>>(
                  future: DashboardPreferences().fetchUUIDs(),
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
                          final votingStartTime =
                              DateTime.fromMillisecondsSinceEpoch(
                                  process.votingDates[0]);

                          if (process.votingDates.length == 2) {
                            votingEndTime = DateTime.fromMillisecondsSinceEpoch(
                                process.votingDates[1]);
                          }

                          if (process.proposalDates != null &&
                              process.proposalDates!.length == 2) {
                            proposalEndTime =
                                DateTime.fromMillisecondsSinceEpoch(
                                    process.proposalDates![1]);
                          }
                          final proposalsLength =
                              process.proposals?.length ?? 0;
                          if (proposalEndTime != null &&
                              proposalEndTime.isAfter(now)) {
                            currentlyInProgress.add(process);
                          } else if (votingStartTime.isBefore(now) &&
                              proposalsLength == 0) {
                            completedProcesses.add(process);
                          } else if (votingEndTime != null &&
                              votingEndTime.isAfter(now)) {
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
                              emptyMessage: localizations.noProcessesInProgress,
                            ),
                            _buildSection(
                              localizations.completedProcesses,
                              completedProcesses,
                              emptyMessage:
                                  localizations.completedProcessesEmptyMessage,
                              skipCompleted: true,
                            ),
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
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 350,
              crossAxisSpacing: 5,
              mainAxisSpacing: 5,
              childAspectRatio: 0.8,
            ),
            itemCount: processes.length,
            itemBuilder: (context, index) {
              final process = processes[index];
              return InkWell(
                onTap: () async {
                  setState(() => _isLoading = true);
                  context.go('/process/${process.id}');
                },
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Stack(
                      children: [
                        ProcessInfo(
                          process: process,
                          showSharePart: false,
                          skipCompleted: skipCompleted,
                          quickView: true,
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
      ],
    );
  }
}
