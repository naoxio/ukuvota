/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/widgets/layout/main_scaffold.dart';
import 'package:ukuvota/services/shared_process_service.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
                  FutureBuilder<Map<String, dynamic>?>(
                    future: SharedProcessService().getSharedProcessData(),
                    builder: (context, snapshot) {
                      final processData = snapshot.data;
                      final currentlyInProgress =
                          processData?['currentlyInProgress'] as List<dynamic>?;
                      final completedProcesses =
                          processData?['completedProcesses'] as List<dynamic>?;

                      return Column(
                        children: [
                          if (currentlyInProgress != null &&
                              currentlyInProgress.isNotEmpty)
                            _buildSection(
                              'Currently In Progress',
                              currentlyInProgress,
                            ),
                          _buildSection(
                            'Completed Processes',
                            completedProcesses ?? [],
                            emptyMessage:
                                'Completed processes will appear here.',
                          ),
                        ],
                      );
                    },
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      // Navigate to the new process screen using go_router
                      context.go('/create');
                    },
                    child: const Text('Start a New Process'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<dynamic> items,
      {String emptyMessage = ''}) {
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
        if (items.isNotEmpty)
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.5,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
            ),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];
              return Card(
                child: Center(
                  child: Text(item.toString()),
                ),
              );
            },
          )
        else if (emptyMessage.isNotEmpty)
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Text(
                  emptyMessage,
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ),
          ),
        const SizedBox(height: 20),
      ],
    );
  }
}
