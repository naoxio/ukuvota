import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/layout/main_scaffold.dart';
import 'package:ukuvota/widgets/process/process_info.dart';

class ProcessScaffold extends StatelessWidget {
  final Map<String, dynamic> process;
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
