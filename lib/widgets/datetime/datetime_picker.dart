// file: lib/widgets/datetime/datetime_picker.dart
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DatetimePicker extends StatelessWidget {
  final int index;
  final DateTime date;
  final DateTime min;
  final String id;
  final Function(DateTime) onChanged;

  const DatetimePicker({
    Key? key,
    required this.index,
    required this.date,
    required this.min,
    required this.id,
    required this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final label =
        index == 0 ? localizations.phasesStartAt : localizations.phasesEndsAt;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(
          width: 200,
          child: TextFormField(
            initialValue: DateFormat('yyyy-MM-ddTHH:mm').format(date),
            decoration: InputDecoration(
              labelText: label,
              border: const OutlineInputBorder(),
            ),
            onChanged: (value) {
              final selectedDate = DateTime.parse(value);
              onChanged(selectedDate);
            },
          ),
        ),
      ],
    );
  }
}
