// file: lib/widgets/datetime/time_selector.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/widgets/datetime/datetime_picker.dart';
import 'package:ukuvota/widgets/datetime/datetime_slider.dart';

class TimeSelector extends StatelessWidget {
  final String phase;
  final DateTime startDate;
  final DateTime endDate;
  final DateTime startMinDate;
  final bool hideTitle;
  final Function(DateTime) onStartDateChanged;
  final Function(DateTime) onEndDateChanged;

  const TimeSelector({
    Key? key,
    required this.phase,
    required this.startDate,
    required this.endDate,
    required this.startMinDate,
    this.hideTitle = false,
    required this.onStartDateChanged,
    required this.onEndDateChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final title = phase == "proposal"
        ? localizations.phasesProposalTitle
        : localizations.phasesVotingTitle;
    final duration = endDate.difference(startDate).inMinutes;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            DatetimePicker(
              index: 0,
              date: startDate,
              min: startMinDate,
              id: 'start-date-picker-$phase',
              onChanged: onStartDateChanged,
            ),
            DatetimePicker(
              index: 1,
              date: endDate,
              min: startDate,
              id: 'end-date-picker-$phase',
              onChanged: onEndDateChanged,
            ),
          ],
        ),
        const SizedBox(height: 16),
        DatetimeSlider(duration: duration, id: 'datetime-slider-$phase'),
        const SizedBox(height: 16),
      ],
    );
  }
}
