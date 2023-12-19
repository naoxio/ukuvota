type SliderMapping = {
  minSliderValue: number;
  maxSliderValue: number;
  minDuration: number; // Starting duration in minutes for this range
  stepDuration: number; // Duration step change per slider value in minutes
};

const sliderMappings: SliderMapping[] = [
  { minSliderValue: 1, maxSliderValue: 10, minDuration: 1, stepDuration: 1 }, // minute by minute
  { minSliderValue: 11, maxSliderValue: 20, minDuration: 15, stepDuration: 5 }, // every 5 minutes
  { minSliderValue: 20, maxSliderValue: 32, minDuration: 60, stepDuration: 10 }, // every 10 minutes
  { minSliderValue: 32, maxSliderValue: 44, minDuration: 180, stepDuration: 15 }, // every 15 minutes
  { minSliderValue: 44, maxSliderValue: 56, minDuration: 360, stepDuration: 30 }, // every 30 minutes
  { minSliderValue: 56, maxSliderValue: 60, minDuration: 720, stepDuration: 60 }, // every hour
  { minSliderValue: 60, maxSliderValue: 64, minDuration: 960, stepDuration: 120 }, // every 2 hours
  { minSliderValue: 64, maxSliderValue: 94, minDuration: 1440, stepDuration: 240 }, // every 4 hours
  { minSliderValue: 94, maxSliderValue: 110, minDuration: 8640, stepDuration: 720 }, // every half day
  { minSliderValue: 110, maxSliderValue: 126, minDuration: 20160, stepDuration: 1440 }, // every day
  { minSliderValue: 126, maxSliderValue: 141, minDuration: 43200, stepDuration: 2880 }, // every 2 days
  { minSliderValue: 141, maxSliderValue: 165, minDuration: 86400, stepDuration: 7200 }, // every 5 days
];

const sliderToDuration = (value: number): number => {
  for (const mapping of sliderMappings) {
    if (value >= mapping.minSliderValue && value <= mapping.maxSliderValue) {
      return mapping.minDuration + (value - mapping.minSliderValue) * mapping.stepDuration;
    }
  }
  return 0;
};

const durationToSlider = (duration: number): number => {
  for (const mapping of sliderMappings) {
    if (duration >= mapping.minDuration && duration < mapping.minDuration + (mapping.maxSliderValue - mapping.minSliderValue + 1) * mapping.stepDuration) {
      return mapping.minSliderValue + Math.floor((duration - mapping.minDuration) / mapping.stepDuration);
    }
  }
  return duration;
};


export { sliderToDuration, durationToSlider };