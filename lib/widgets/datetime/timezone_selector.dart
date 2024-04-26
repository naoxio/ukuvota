import 'package:flutter/material.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz;
import 'package:flutter_timezone_plus/flutter_timezone_plus.dart';

class TimeZoneSelector extends StatefulWidget {
  final void Function(String) onTimeZoneChanged;

  const TimeZoneSelector({Key? key, required this.onTimeZoneChanged})
      : super(key: key);

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
    String? currentTimeZone = await FlutterTimezone.getLocalTimezone();
    setState(() {
      _selectedTimeZone = currentTimeZone ?? 'UTC';
      tz.setLocalLocation(tz.getLocation(_selectedTimeZone!));
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
