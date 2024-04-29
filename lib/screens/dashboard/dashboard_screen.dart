/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/layout/main_scaffold.dart';
import 'package:ukuvota/services/shared_process_service.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                const SizedBox(height: 20),
                Image.asset(
                  'assets/images/logo.png',
                  width: 220,
                ),
                const SizedBox(height: 10),
                FutureBuilder<Map<String, dynamic>?>(
                  future: SharedProcessService().getSharedProcessData(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      final processData = snapshot.data!;
                      final recentlyAccessed =
                          processData['recentlyAccessed'] as List<dynamic>?;
                      final savedProcesses =
                          processData['savedProcesses'] as List<dynamic>?;

                      return Column(
                        children: [
                          if (recentlyAccessed != null &&
                              recentlyAccessed.isNotEmpty)
                            _buildSection(
                                'Recently Accessed', recentlyAccessed),
                          if (savedProcesses != null &&
                              savedProcesses.isNotEmpty)
                            _buildSection('Saved Processes', savedProcesses),
                          ElevatedButton(
                            onPressed: () {
                              // Navigate to the new process screen
                            },
                            child: const Text('Start a New Process'),
                          ),
                        ],
                      );
                    } else {
                      return const CircularProgressIndicator();
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<dynamic> items) {
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
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}
