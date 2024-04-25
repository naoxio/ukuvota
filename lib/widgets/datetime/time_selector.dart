import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/datetime/datetime_picker.dart';
import 'package:ukuvota/widgets/datetime/datetime_slider.dart';

class TimeSelector extends StatefulWidget {
  final String phase;
  final DateTime startDate;
  final DateTime endDate;
  final DateTime startMinDate;
  final bool hideTitle;

  const TimeSelector({
    Key? key,
    required this.phase,
    required this.startDate,
    required this.endDate,
    required this.startMinDate,
    this.hideTitle = false,
  }) : super(key: key);

  @override
  _TimeSelectorState createState() => _TimeSelectorState();
}

class _TimeSelectorState extends State<TimeSelector> {
  late DateTime _startDate;
  late DateTime _endDate;
  late int _duration;

  @override
  void initState() {
    super.initState();
    _startDate = widget.startDate;
    _endDate = widget.endDate;
    _duration = _endDate.difference(_startDate).inMinutes;
  }

  void _onStartDateChanged(DateTime newStartDate) {
    setState(() {
      _startDate = newStartDate;
      _updateEndDate();
      _updateDuration();
    });
  }

  void _onEndDateChanged(DateTime newEndDate) {
    setState(() {
      _endDate = newEndDate;
      _updateStartDate();
      _updateDuration();
    });
  }

  void _onDurationChanged(int durationInMinutes) {
    setState(() {
      _duration = durationInMinutes;
      _endDate = _startDate.add(Duration(minutes: durationInMinutes));
    });
  }

  void _updateStartDate() {
    if (_endDate.isBefore(_startDate)) {
      _startDate = _endDate;
    }
  }

  void _updateEndDate() {
    if (_endDate.isBefore(_startDate)) {
      _endDate = _startDate.add(const Duration(minutes: 1));
    }
  }

  void _updateDuration() {
    _duration = _endDate.difference(_startDate).inMinutes;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            DatetimePicker(
              index: 0,
              date: _startDate,
              min: widget.startMinDate,
              id: 'start-date-picker-${widget.phase}',
              onChanged: _onStartDateChanged,
            ),
            DatetimePicker(
              index: 1,
              date: _endDate,
              min: _startDate,
              id: 'end-date-picker-${widget.phase}',
              onChanged: _onEndDateChanged,
            ),
          ],
        ),
        const SizedBox(height: 16),
        DatetimeSlider(
          durationInMinutes: _duration,
          id: 'datetime-slider-${widget.phase}',
          onChanged: _onDurationChanged,
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}
