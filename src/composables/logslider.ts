const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

const roundDuration = (duration: number): number => {
   switch (true) {
      case (duration >= year):
        return Math.round(duration / month) * month;
      case (duration >= month):
        return Math.round(duration / day) * day;
      case (duration >= day):
        return Math.round(duration / hour) * hour;
      case (duration >= hour):
        return Math.round(duration / minute) * minute;
      default:
        return duration;
    }
}


const sliderToDuration = (value) => {
  console.log(value)
  if (value <= 10) {
    return value * 1000 * 60
  } else if (value <= 35) {
    // 1 minute to 1 hour
    return Math.round((minute - minute * 10) + value * (hour - (minute * 10)) / 25 - minute);
  } else if (value <= 47) {
    // 1 hour to 4 hours
    return Math.round(hour + (value - 35) * 15 * minute); 
  } else if (value <= 59) {
    // 4 hours to 8 hours
    return Math.round(4 * hour + (value - 47) * 20 * minute);
  } else if (value <= 91) {
    // 8 hour to 1 day
    return Math.round(8 * hour + (value - 59) * 30 * minute);
  } else if (value <= 115) {
    // 1 day to 3 days
    return Math.round(day + (value - 91) * 2 * hour);
  } else if (value <= 139) {
    // 3 days to 7 days
    return Math.round(3 * day + (value - 115) * 4 * hour);
  } else if (value <= 160) {
    // 7 days to 1 month
    return Math.round(week + (value - 139) * day);
  } else if (value <= 174) {
    // 1 month to 2 months
    return Math.round(month + (value - 160) * 2 * day + day);
  } else if (value <= 178) {
    // 2 months to 3 months
    return Math.round(2 * month + (value - 174) * week + day);
  } else if (value <= 180) {
    // 3 months to 5 months
    return Math.round(3 * month + (value - 178) * month);
  }  else if (value <= 184) {
    // 5 months to 8 months
    return Math.round(5 * month + (value - 180) * month + day * (value - 180) * 0.8);
  }
};


export default function(value: number) {
  //return roundDuration(logslider(value) * 1000 * 60)
  return roundDuration(sliderToDuration(value))

}