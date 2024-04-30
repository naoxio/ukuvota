/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/scaffolds/process_scaffold.dart';
import 'package:ukuvota/widgets/process/results_card.dart';

class ResultsScreen extends StatefulWidget {
  final Process process;

  const ResultsScreen({Key? key, required this.process}) : super(key: key);

  @override
  ResultsScreenState createState() => ResultsScreenState();
}

class ResultsScreenState extends State<ResultsScreen> {
  @override
  Widget build(BuildContext context) {
    final process = widget.process;

    return ProcessScaffold(
      process: process,
      child: ResultsCard(process: process),
    );
  }
}
