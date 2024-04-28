// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

class SliderMapping {
  final int minSliderValue;
  final int maxSliderValue;
  final int minDuration;
  final int stepDuration;

  SliderMapping({
    required this.minSliderValue,
    required this.maxSliderValue,
    required this.minDuration,
    required this.stepDuration,
  });
}

final List<SliderMapping> sliderMappings = [
  SliderMapping(
      minSliderValue: 1, maxSliderValue: 10, minDuration: 1, stepDuration: 1),
  SliderMapping(
      minSliderValue: 11, maxSliderValue: 20, minDuration: 15, stepDuration: 5),
  SliderMapping(
      minSliderValue: 20,
      maxSliderValue: 32,
      minDuration: 60,
      stepDuration: 10),
  SliderMapping(
      minSliderValue: 32,
      maxSliderValue: 44,
      minDuration: 180,
      stepDuration: 15),
  SliderMapping(
      minSliderValue: 44,
      maxSliderValue: 56,
      minDuration: 360,
      stepDuration: 30),
  SliderMapping(
      minSliderValue: 56,
      maxSliderValue: 60,
      minDuration: 720,
      stepDuration: 60),
  SliderMapping(
      minSliderValue: 60,
      maxSliderValue: 64,
      minDuration: 960,
      stepDuration: 120),
  SliderMapping(
      minSliderValue: 64,
      maxSliderValue: 94,
      minDuration: 1440,
      stepDuration: 240),
  SliderMapping(
      minSliderValue: 94,
      maxSliderValue: 110,
      minDuration: 8640,
      stepDuration: 720),
  SliderMapping(
      minSliderValue: 110,
      maxSliderValue: 126,
      minDuration: 20160,
      stepDuration: 1440),
  SliderMapping(
      minSliderValue: 126,
      maxSliderValue: 141,
      minDuration: 43200,
      stepDuration: 2880),
  SliderMapping(
      minSliderValue: 141,
      maxSliderValue: 165,
      minDuration: 86400,
      stepDuration: 7200),
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
