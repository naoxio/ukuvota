// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'package:flutter/material.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/widgets/layout/main_scaffold.dart';
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
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ProcessInfo(process: process),
          const SizedBox(height: 16),
          Expanded(child: child),
        ],
      ),
    );
  }
}
