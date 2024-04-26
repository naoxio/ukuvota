import 'package:flutter/material.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz;

class TimeZoneSelector extends StatefulWidget {
  final void Function(String) onTimeZoneChanged;
  final String? initialTimeZone;

  const TimeZoneSelector({
    Key? key,
    required this.onTimeZoneChanged,
    this.initialTimeZone,
  }) : super(key: key);

  @override
  TimeZoneSelectorState createState() => TimeZoneSelectorState();
}

class TimeZoneSelectorState extends State<TimeZoneSelector> {
  String? _selectedTimeZone;

  @override
  void initState() {
    super.initState();
    initTimezone();
  }

  Future<void> initTimezone() async {
    tz.initializeTimeZones();
    setState(() {
      _selectedTimeZone = widget.initialTimeZone;
    });
  }

  @override
  Widget build(BuildContext context) {
    return _selectedTimeZone == null
        ? const CircularProgressIndicator()
        : DropdownButtonFormField<String>(
            value: _selectedTimeZone,
            onChanged: (timeZone) {
              setState(() {
                _selectedTimeZone = timeZone;
                tz.setLocalLocation(tz.getLocation(_selectedTimeZone!));
              });
              widget.onTimeZoneChanged(timeZone!);
            },
            items: tz.timeZoneDatabase.locations.keys
                .map<DropdownMenuItem<String>>((location) {
              return DropdownMenuItem<String>(
                value: location,
                child: Text(tz.getLocation(location).toString()),
              );
            }).toList(),
            decoration: const InputDecoration(
              labelText: 'Time Zone',
              border: OutlineInputBorder(),
            ),
          );
  }
}
