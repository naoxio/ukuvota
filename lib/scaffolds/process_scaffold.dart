/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/main_scaffold.dart';
import 'package:ukuvota/widgets/process/process_info.dart';

class ProcessScaffold extends StatelessWidget {
  final Process process;
  final Widget child;

  const ProcessScaffold({
    Key? key,
    required this.process,
    required this.child,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(left: 8.0, right: 8.0, bottom: 16.0),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 800),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ProcessInfo(process: process),
                  const SizedBox(height: 16),
                  child,
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
