
const formatLocalDateTime = (date: Date): string => {
    const offset: number = date.getTimezoneOffset() * 60000;
    const localISOTime: string = (new Date(date.getTime() - offset)).toISOString().slice(0, -1);
    return localISOTime.split('.')[0];
  }

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
  

  export { formatLocalDateTime, formatDuration }