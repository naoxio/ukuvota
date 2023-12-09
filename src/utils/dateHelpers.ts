import { formatDuration, formatDistanceStrict, format, intervalToDuration } from 'date-fns'
import { enUS, de } from 'date-fns/locale';
import { astroI18n } from 'astro-i18n';

const getDateLocale = () => {
    const currentLocale = astroI18n.locale;

    switch (currentLocale) {
        case 'de':
            return de;
        case 'en':
        default:
            return enUS;
    }
}

const fmtDuration = (start: any, end: any, units = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']) => {
    if (!start) start = +new Date()
    return formatDuration(intervalToDuration({ start, end }), {
        locale: getDateLocale(),
        format: units
    })
}


const fmtDistanceStrict = (date: any, baseDate: any) => {
    return formatDistanceStrict(date, baseDate, {
        locale: getDateLocale(),
    })
}


const fmt = (date: any, formatStr = 'PP') => {
    return format(date, formatStr, {
    locale: getDateLocale() 
  })
}

export { fmtDuration, fmtDistanceStrict, fmt }