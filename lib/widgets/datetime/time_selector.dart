// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/datetime/datetime_picker.dart';
import 'package:ukuvota/widgets/datetime/datetime_slider.dart';

class TimeSelector extends StatefulWidget {
  final String phase;
  final DateTime startDate;
  final DateTime endDate;
  final DateTime startMinDate;
  final bool hideTitle;
  final Function(DateTime) onStartDateChanged;
  final Function(DateTime) onEndDateChanged;
  final String? selectedTimeZone;

  const TimeSelector({
    Key? key,
    required this.phase,
    required this.startDate,
    required this.endDate,
    required this.startMinDate,
    this.hideTitle = false,
    required this.onStartDateChanged,
    required this.onEndDateChanged,
    this.selectedTimeZone,
  }) : super(key: key);

  @override
  TimeSelectorState createState() => TimeSelectorState();
}

class TimeSelectorState extends State<TimeSelector> {
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

  @override
  void didUpdateWidget(covariant TimeSelector oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.startDate != oldWidget.startDate ||
        widget.endDate != oldWidget.endDate) {
      _startDate = widget.startDate;
      _endDate = widget.endDate;
      _duration = _endDate.difference(_startDate).inMinutes;
    }
  }

  void _onStartDateChanged(DateTime newStartDate) {
    var startDate = newStartDate;
    if (newStartDate.isBefore(DateTime.now())) {
      startDate = DateTime.now().add(const Duration(minutes: 1));
    }
    setState(() {
      _startDate = startDate;
      _endDate = _startDate.add(Duration(minutes: _duration));
      _updateDuration();
    });
    widget.onStartDateChanged(startDate);
    widget.onEndDateChanged(_endDate);
  }

  void _onEndDateChanged(DateTime newEndDate) {
    var endDate = newEndDate;
    if (newEndDate.isBefore(_startDate)) {
      endDate = _startDate.add(const Duration(minutes: 1));
    }
    setState(() {
      _endDate = endDate;
      _updateStartDate();
      _updateDuration();
    });
    widget.onEndDateChanged(endDate);
  }

  void _onDurationChanged(int durationInMinutes) {
    setState(() {
      _duration = durationInMinutes;
      _endDate = _startDate.add(Duration(minutes: durationInMinutes));
      _updateDuration();
      _onEndDateChanged(_endDate);
    });
  }

  void _updateStartDate() {
    if (_endDate.isBefore(_startDate)) {
      _startDate = _endDate.subtract(const Duration(minutes: 1));
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
              selectedTimeZone: widget.selectedTimeZone,
            ),
            DatetimePicker(
              index: 1,
              date: _endDate,
              min: _startDate,
              id: 'end-date-picker-${widget.phase}',
              onChanged: _onEndDateChanged,
              selectedTimeZone: widget.selectedTimeZone,
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
