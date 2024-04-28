import 'package:flutter/material.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/utils/markdown_loader.dart';
import 'package:ukuvota/utils/proposal_utils.dart';
import 'package:ukuvota/utils/weighting_options.dart';
import 'package:ukuvota/widgets/datetime/process_time_label.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:qr_flutter/qr_flutter.dart';

class ProcessInfo extends StatelessWidget {
  final Process process;
  const ProcessInfo({Key? key, required this.process}) : super(key: key);

  void _showModal(BuildContext context, String title, Widget content) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: content,
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  void _showQRCodeDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return SimpleDialog(
          title: Text(
            AppLocalizations.of(context)!.processQrCode,
            style: Theme.of(context).textTheme.titleLarge,
          ),
          children: [
            const SizedBox(height: 16),
            QrImage(
              // Use the QrImage widget from qr_flutter
              data: Uri.base.toString(),
              version: QrVersions.auto,
              size: 200.0,
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final weightLabel =
        process.weighting != null ? weightingOptions[process.weighting] : null;
    final timezone = process.timezone ?? 'UTC';
    final description = process.description ?? '';

    final proposalsLength = process.proposals?.length ?? 0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          process.title,
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 16),
        HtmlWidget(convertToHtml(description)),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Text(localizations.processWeighting),
            const SizedBox(width: 8),
            Text(weightLabel ?? ''),
            const SizedBox(width: 8),
            IconButton(
              icon: const Icon(Icons.info),
              onPressed: () {
                _showModal(
                  context,
                  localizations.processWeighting,
                  MarkdownLoader(
                    localeName: localizations.localeName,
                    fileName: 'NegativeScoreWeighting',
                  ),
                );
              },
            ),
          ],
        ),
        const SizedBox(height: 16),
        if (process.proposalDates != null && process.proposalDates![0] > 0)
          ProcessTimeLabel(
            timezone: timezone,
            phase: 'proposal',
            dates: process.proposalDates!,
          ),
        const SizedBox(height: 8),
        ProcessTimeLabel(
          timezone: timezone,
          phase: 'voting',
          dates: process.votingDates,
          proposalsLength: proposalsLength,
        ),
        const SizedBox(height: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(localizations.processShareableUrl),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    readOnly: true,
                    initialValue: Uri.base.toString(),
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                IconButton(
                  icon: const Icon(Icons.qr_code),
                  onPressed: () {
                    _showQRCodeDialog(context);
                  },
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
