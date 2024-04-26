import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:timezone/timezone.dart' as tz;

class DatetimePicker extends StatelessWidget {
  final int index;
  final DateTime date;
  final DateTime min;
  final String id;
  final Function(DateTime) onChanged;
  final String? selectedTimeZone;

  const DatetimePicker({
    Key? key,
    required this.index,
    required this.date,
    required this.min,
    required this.id,
    required this.onChanged,
    this.selectedTimeZone,
  }) : super(key: key);

  Future<void> _selectDate(BuildContext context, DateTime initialDate) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: min,
      lastDate: DateTime(2100),
    );
    if (pickedDate != null) {
      _selectTime(context, pickedDate);
    }
  }

  Future<void> _selectTime(BuildContext context, DateTime pickedDate) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(pickedDate),
    );
    if (pickedTime != null) {
      final selectedDate = DateTime(
        pickedDate.year,
        pickedDate.month,
        pickedDate.day,
        pickedTime.hour,
        pickedTime.minute,
      );
      onChanged(selectedDate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final label =
        index == 0 ? localizations.phasesStartAt : localizations.phasesEndsAt;

    // Format the date and time in the selected timezone
    final formattedDate = selectedTimeZone != null
        ? DateFormat('yyyy-MM-dd HH:mm').format(
            tz.TZDateTime.from(date, tz.getLocation(selectedTimeZone!)),
          )
        : DateFormat('yyyy-MM-dd HH:mm').format(date);

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(
          width: 200,
          child: TextFormField(
            readOnly: true,
            controller: TextEditingController(text: formattedDate),
            decoration: InputDecoration(
              labelText: label,
              border: const OutlineInputBorder(),
              suffixIcon: const Icon(Icons.calendar_today),
            ),
            onTap: () => _selectDate(context, date),
          ),
        ),
      ],
    );
  }
}
