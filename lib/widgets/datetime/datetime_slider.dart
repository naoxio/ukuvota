// file: lib/widgets/datetime/datetime_slider.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/utils/logslider.dart';

class DatetimeSlider extends StatelessWidget {
  final int duration;
  final String id;

  const DatetimeSlider({
    Key? key,
    required this.duration,
    required this.id,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final initialSliderValue = durationToSlider(duration);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('${localizations.setupDuration}: '),
        const SizedBox(width: 8),
        const Text(
          '',
          style: TextStyle(color: Colors.green),
        ),
        const SizedBox(height: 8),
        Slider(
          value: initialSliderValue.toDouble(),
          min: 1,
          max: 165,
          onChanged: (value) {
            // Handle slider value change
          },
        ),
      ],
    );
  }
}
