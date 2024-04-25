// file: lib/utils/logslider.dart
class SliderMapping {
  final int minSliderValue;
  final int maxSliderValue;
  final int minDuration; // Starting duration in minutes for this range
  final int stepDuration; // Duration step change per slider value in minutes

  SliderMapping({
    required this.minSliderValue,
    required this.maxSliderValue,
    required this.minDuration,
    required this.stepDuration,
  });
}

final List<SliderMapping> sliderMappings = [
  SliderMapping(
      minSliderValue: 1,
      maxSliderValue: 10,
      minDuration: 1,
      stepDuration: 1), // minute by minute
  SliderMapping(
      minSliderValue: 11,
      maxSliderValue: 20,
      minDuration: 15,
      stepDuration: 5), // every 5 minutes
  SliderMapping(
      minSliderValue: 20,
      maxSliderValue: 32,
      minDuration: 60,
      stepDuration: 10), // every 10 minutes
  SliderMapping(
      minSliderValue: 32,
      maxSliderValue: 44,
      minDuration: 180,
      stepDuration: 15), // every 15 minutes
  SliderMapping(
      minSliderValue: 44,
      maxSliderValue: 56,
      minDuration: 360,
      stepDuration: 30), // every 30 minutes
  SliderMapping(
      minSliderValue: 56,
      maxSliderValue: 60,
      minDuration: 720,
      stepDuration: 60), // every hour
  SliderMapping(
      minSliderValue: 60,
      maxSliderValue: 64,
      minDuration: 960,
      stepDuration: 120), // every 2 hours
  SliderMapping(
      minSliderValue: 64,
      maxSliderValue: 94,
      minDuration: 1440,
      stepDuration: 240), // every 4 hours
  SliderMapping(
      minSliderValue: 94,
      maxSliderValue: 110,
      minDuration: 8640,
      stepDuration: 720), // every half day
  SliderMapping(
      minSliderValue: 110,
      maxSliderValue: 126,
      minDuration: 20160,
      stepDuration: 1440), // every day
  SliderMapping(
      minSliderValue: 126,
      maxSliderValue: 141,
      minDuration: 43200,
      stepDuration: 2880), // every 2 days
  SliderMapping(
      minSliderValue: 141,
      maxSliderValue: 165,
      minDuration: 86400,
      stepDuration: 7200), // every 5 days
];

int sliderToDuration(int value) {
  for (final mapping in sliderMappings) {
    if (value >= mapping.minSliderValue && value <= mapping.maxSliderValue) {
      return mapping.minDuration +
          (value - mapping.minSliderValue) * mapping.stepDuration;
    }
  }
  return 0;
}

int durationToSlider(int duration) {
  for (final mapping in sliderMappings) {
    if (duration >= mapping.minDuration &&
        duration <
            mapping.minDuration +
                (mapping.maxSliderValue - mapping.minSliderValue + 1) *
                    mapping.stepDuration) {
      return mapping.minSliderValue +
          ((duration - mapping.minDuration) ~/ mapping.stepDuration);
    }
  }
  return duration;
}
