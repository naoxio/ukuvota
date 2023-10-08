const msIn = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

const roundDuration = (duration: number): number => {
  const { year, month, day, hour, minute } = msIn;

  if (duration >= year) return Math.round(duration / month) * month;
  if (duration >= month) return Math.round(duration / day) * day;
  if (duration >= day) return Math.round(duration / hour) * hour;
  if (duration >= hour) return Math.round(duration / minute) * minute;
  
  return duration;
};

const sliderToDuration = (value: number): number => {
  const { minute, hour, day, week, month } = msIn;
  let duration = 0;

  if (value <= 10) duration = value * minute;
  else if (value <= 35) duration = (minute * 10) + value * (hour - (minute * 10)) / 25 - minute;
  else if (value <= 47) duration = hour + (value - 35) * 15 * minute;
  else if (value <= 59) duration = 4 * hour + (value - 47) * 20 * minute;
  else if (value <= 91) duration = 8 * hour + (value - 59) * 30 * minute;
  else if (value <= 115) duration = day + (value - 91) * 2 * hour;
  else if (value <= 139) duration = 3 * day + (value - 115) * 4 * hour;
  else if (value <= 160) duration = week + (value - 139) * day;
  else if (value <= 174) duration = month + (value - 160) * 2 * day + day;
  else if (value <= 178) duration = 2 * month + (value - 174) * week + day;
  else if (value <= 180) duration = 3 * month + (value - 178) * month;
  else if (value <= 184) duration = 5 * month + (value - 180) * month + day * (value - 180) * 0.8;

  return Math.round(duration);
};

export default function(value: number): number {
  return roundDuration(sliderToDuration(value));
}
