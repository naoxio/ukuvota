// file: lib/widgets/datetime/datetime_picker.dart
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DatetimePicker extends StatefulWidget {
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
  _DatetimePickerState createState() => _DatetimePickerState();
}

class _DatetimePickerState extends State<DatetimePicker> {
  late DateTime selectedDate;

  @override
  void initState() {
    super.initState();
    selectedDate = widget.date;
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: widget.min,
      lastDate: DateTime(2100),
    );
    if (pickedDate != null && pickedDate != selectedDate) {
      _selectTime(context, pickedDate);
    }
  }

  Future<void> _selectTime(BuildContext context, DateTime pickedDate) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(pickedDate),
    );
    if (pickedTime != null) {
      setState(() {
        selectedDate = DateTime(
          pickedDate.year,
          pickedDate.month,
          pickedDate.day,
          pickedTime.hour,
          pickedTime.minute,
        );
        widget.onChanged(selectedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final label = widget.index == 0
        ? localizations.phasesStartAt
        : localizations.phasesEndsAt;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(
          width: 200,
          child: TextFormField(
            readOnly: true,
            controller: TextEditingController(
                text: DateFormat('yyyy-MM-dd HH:mm').format(selectedDate)),
            decoration: InputDecoration(
              labelText: label,
              border: const OutlineInputBorder(),
              suffixIcon: const Icon(Icons.calendar_today),
            ),
            onTap: () => _selectDate(context),
          ),
        ),
      ],
    );
  }
}
