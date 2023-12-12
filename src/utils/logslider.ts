type SliderMapping = {
  minSliderValue: number;
  maxSliderValue: number;
  minDuration: number; // Starting duration in minutes for this range
  stepDuration: number; // Duration step change per slider value in minutes
};

const sliderMappings: SliderMapping[] = [
  { minSliderValue: 1, maxSliderValue: 10, minDuration: 0, stepDuration: 1 }, // 1-10: minute by minute
  { minSliderValue: 11, maxSliderValue: 35, minDuration: 10, stepDuration: 5 }, // 11-35: every 5 minutes
  { minSliderValue: 36, maxSliderValue: 60, minDuration: 130, stepDuration: 10 }, // 36-60: every 10 minutes
  { minSliderValue: 61, maxSliderValue: 84, minDuration: 370, stepDuration: 30 }, // 61-84: every 30 minutes
  { minSliderValue: 85, maxSliderValue: 100, minDuration: 1090, stepDuration: 60 }, // 85-100: every hour
  { minSliderValue: 101, maxSliderValue: 120, minDuration: 1990, stepDuration: 120 }, // 101-120: every 2 hours
  { minSliderValue: 121, maxSliderValue: 135, minDuration: 4390, stepDuration: 240 }, // 121-135: every 4 hours
  { minSliderValue: 136, maxSliderValue: 150, minDuration: 8950, stepDuration: 480 }, // 136-150: every 8 hours
  { minSliderValue: 151, maxSliderValue: 164, minDuration: 17510, stepDuration: 1440 }, // 151-164: every day
  { minSliderValue: 165, maxSliderValue: 174, minDuration: 32770, stepDuration: 2880 }, // 165-174: every 2 days
  { minSliderValue: 175, maxSliderValue: 184, minDuration: 58850, stepDuration: 4320 }, // 175-184: every 3 days
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
  return 0; // Default return for out of range values
};


export { sliderToDuration, durationToSlider };