import { DateTime, Duration } from 'luxon';

const formatDuration = (durationInSeconds: number): string => {
  const times = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  let result = '';
  let remainingSeconds = durationInSeconds;

  if (durationInSeconds >= times.year) {
    const years = Math.floor(remainingSeconds / times.year);
    remainingSeconds %= times.year;
    const months = Math.floor(remainingSeconds / times.month);
    result = `${years}y ${months}mo`;
  } else if (durationInSeconds >= times.month) {
    const months = Math.floor(remainingSeconds / times.month);
    remainingSeconds %= times.month;
    const days = Math.floor(remainingSeconds / times.day);
    result = `${months}mo ${days}d`;
  } else if (durationInSeconds >= times.day) {
    const days = Math.floor(remainingSeconds / times.day);
    remainingSeconds %= times.day;
    const hours = Math.floor(remainingSeconds / times.hour);
    result = `${days}d ${hours}h`;
  } else if (durationInSeconds >= times.hour) {
    const hours = Math.floor(remainingSeconds / times.hour);
    remainingSeconds %= times.hour;
    const minutes = Math.floor(remainingSeconds / times.minute);
    result = `${hours}h ${minutes}m`;
  } else if (durationInSeconds >= times.minute * 5) {
    const minutes = Math.floor(remainingSeconds / times.minute);
    result = `${minutes}m`;
  } else {
    result = `${Math.floor(remainingSeconds)}s`;
  }
  return result;
};

const prettyFormatInTimezone = (utcMillis: number, timezone: string, formatStr = 'MMMM dd, yyyy, h:mm a') => {
  return DateTime.fromMillis(utcMillis).setZone(timezone).toFormat(formatStr);
}

const formatDateInTimezone = (date: number, timezone?: string): string => {
  return DateTime.fromMillis(date).setZone(timezone || 'UTC').toFormat("yyyy-MM-dd'T'HH:mm");
};

const formatDate = (date: number): string => {
  return DateTime.fromMillis(date).toUTC().toFormat("yyyy-MM-dd'T'HH:mm");
};

function getTimezoneOffset(timezone: string): number {
  const now = DateTime.now().setZone(timezone);
  return now.offset;
}


const parseDateTime = (dateString: string, timezone?: string): DateTime => {
  return DateTime.fromISO(dateString, { zone: timezone || 'UTC' });
};

export { formatDuration, formatDateInTimezone, prettyFormatInTimezone, formatDate, getTimezoneOffset, parseDateTime };