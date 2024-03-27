import { format, utcToZonedTime } from 'date-fns-tz';

const formatDuration = (durationInSeconds: number): string => {
  if (durationInSeconds < 60) return '1m';
  const units = ['y', 'mo', 'd', 'h', 'm'];
  const times = [31536000, 2592000, 86400, 3600, 60];
  let result = '';
  for (let i = 0; i < units.length; i++) {
    const unitValue = Math.floor(durationInSeconds / times[i]);
    if (unitValue > 0) {
      result += `${unitValue}${units[i]} `;
      durationInSeconds %= times[i];
    }
  }
  return result.trim();
};

const formatDateInTimezone = (date: number, timezone: string): string => {

  const zonedDate = utcToZonedTime(date, timezone);
  return format(zonedDate, "yyyy-MM-dd'T'HH:mm", { timeZone: timezone });
};


export { formatDuration, formatDateInTimezone };