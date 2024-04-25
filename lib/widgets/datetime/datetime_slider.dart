import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/utils/logslider.dart';

class DatetimeSlider extends StatefulWidget {
  final int duration;
  final String id;

  const DatetimeSlider({
    Key? key,
    required this.duration,
    required this.id,
  }) : super(key: key);

  @override
  DatetimeSliderState createState() => DatetimeSliderState();
}

class DatetimeSliderState extends State<DatetimeSlider> {
  late double sliderValue;

  @override
  void initState() {
    super.initState();
    sliderValue = durationToSlider(widget.duration).toDouble();
  }

  int sliderValueToDuration(double value) {
    return (value * 10).round();
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Text(
              '${localizations.setupDuration}: ${sliderValueToDuration(sliderValue)} mins'),
        ),
        Slider(
          value: sliderValue,
          min: 1,
          max: 165,
          divisions: 164,
          label: '${sliderValueToDuration(sliderValue)} mins',
          onChanged: (double newValue) {
            setState(() {
              sliderValue = newValue;
            });
          },
        ),
      ],
    );
  }
}
