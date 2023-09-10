import { formatDuration, formatDistanceStrict, format, intervalToDuration } from 'date-fns'
import getDateLocale from './getDateLocale'

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export function fmtDuration (start: any, end: any, units = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']) {
    if (!start) start = +new Date()
    return formatDuration(intervalToDuration({ start, end }), {
        locale: getDateLocale(),
        format: units
    })
}


export function fmtDistanceStrict (date: any, baseDate: any) {
    return formatDistanceStrict(date, baseDate, {
        locale: getDateLocale(),
    })
}


export function fmt (date, formatStr = 'PP') {
    return format(date, formatStr, {
    locale: getDateLocale() 
  })
}
