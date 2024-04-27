import 'dart:io';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:path_provider/path_provider.dart';
import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/models/process.dart';

Future<void> saveMarkdown(String markdown, String fileName) async {
  final directory = await getApplicationDocumentsDirectory();
  final file = File('${directory.path}/$fileName');
  await file.writeAsString(markdown);
}

Future<void> exportResultsAsImage(BuildContext context, GlobalKey key) async {
  final boundary =
      key.currentContext!.findRenderObject() as RenderRepaintBoundary;
  final image = await boundary.toImage(pixelRatio: 2.0);
  final byteData = await image.toByteData(format: ImageByteFormat.png);
  final pngBytes = byteData!.buffer.asUint8List();

  final directory = await getApplicationDocumentsDirectory();
  final file = File('${directory.path}/results.png');
  await file.writeAsBytes(pngBytes);
}

String generateMarkdown(Process process, List<Voter> selectedVoters) {
  final buffer = StringBuffer();

  buffer.writeln('# ${process.title}');
  buffer.writeln();

  if (process.description != null) {
    buffer.writeln(process.description);
    buffer.writeln();
  }

  buffer.writeln('Process ID: ${process.id}');
  buffer.writeln();

  buffer.writeln('## Voters (${selectedVoters.length}):');
  for (final voter in selectedVoters) {
    buffer.writeln('- ${voter.name}');
  }
  buffer.writeln();

  buffer.writeln('## Proposals:');
  buffer.writeln('| # | Title | Average Score | Total Score |');
  buffer.writeln('| --- | --- | --- | --- |');

  final proposals = process.proposals?.toList() ?? [];
  proposals.sort((a, b) {
    final totalA = a.total ?? 0.0;
    final totalB = b.total ?? 0.0;
    return totalB.compareTo(totalA);
  });

  for (int i = 0; i < proposals.length; i++) {
    final proposal = proposals[i];
    final title = proposal.title;
    final description = proposal.description;
    final totalScore = proposal.total ?? 0.0;
    final averageScore = totalScore / selectedVoters.length;

    buffer.writeln(
      '| ${i + 1} | $title - $description | ${averageScore.toStringAsFixed(2)} | ${totalScore.toStringAsFixed(2)} |',
    );
  }
  return buffer.toString();
}
