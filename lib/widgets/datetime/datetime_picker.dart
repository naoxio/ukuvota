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

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(
          width: 200,
          child: TextFormField(
            readOnly: true,
            controller: TextEditingController(
                text: DateFormat('yyyy-MM-dd HH:mm').format(date)),
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
