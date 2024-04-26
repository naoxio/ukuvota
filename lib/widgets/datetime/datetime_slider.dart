import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/utils/date_utils.dart';
import 'package:ukuvota/utils/logslider.dart';

class DatetimeSlider extends StatefulWidget {
  final int durationInMinutes;
  final String id;
  final Function(int) onChanged;

  const DatetimeSlider({
    Key? key,
    required this.durationInMinutes,
    required this.id,
    required this.onChanged,
  }) : super(key: key);

  @override
  DatetimeSliderState createState() => DatetimeSliderState();
}

class DatetimeSliderState extends State<DatetimeSlider> {
  late int sliderValue;

  @override
  void initState() {
    super.initState();
    _updateSliderValue();
  }

  @override
  void didUpdateWidget(covariant DatetimeSlider oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.durationInMinutes != widget.durationInMinutes) {
      _updateSliderValue();
    }
  }

  void _updateSliderValue() {
    sliderValue = durationToSlider(widget.durationInMinutes);
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    int durationInSeconds = sliderToDuration(sliderValue) * 60;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Text.rich(
            TextSpan(
              children: [
                TextSpan(text: '${localizations.setupDuration}: '),
                TextSpan(
                  text: formatDuration(durationInSeconds),
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ),
        Slider(
          value: sliderValue.toDouble(),
          min: 1,
          max: 165,
          divisions: 164,
          label: formatDuration(durationInSeconds),
          onChanged: (double newValue) {
            setState(() {
              sliderValue = newValue.toInt();
              widget.onChanged(sliderToDuration(sliderValue));
            });
          },
        ),
      ],
    );
  }
}
