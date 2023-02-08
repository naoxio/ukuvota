const roundDuration = (duration: number): number => {
    const year = 31557600000;
    const month = 2629800000;
    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;
    const second = 1000;

    switch (true) {
      case (duration >= year):
        return Math.round(duration / month) * month;
      case (duration >= month):
        return Math.round(duration / day) * day;
      case (duration >= day):
        return Math.round(duration / hour) * hour;
      case (duration >= hour):
        return Math.round(duration / minute) * minute;
      case (duration >= minute):
        return Math.round(duration / second) * second;
      default:
        return duration;
    }
}

const logslider = (position: number) => {
    // position will be between 0 and 100
    const minp = 1;
    const maxp = 1000;

    // The result should be between 100 an 10000000
    const minv = Math.log(1);
    const maxv = Math.log(525601);

    // calculate adjustment factor
    const scale = (maxv-minv) / (maxp-minp);

    return Math.floor(Math.exp(minv + scale*(position-minp)));
}
export default function(value: number) {
    return roundDuration(logslider(value) * 1000 * 60)

}