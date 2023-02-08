import { formatDuration, formatDistanceStrict, format, intervalToDuration } from 'date-fns'
import { enUS, de } from 'date-fns/locale/index'
import i18next from 'i18next'

const locales = {enUS, de}

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export function fmtDuration (start, end, units = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']) {
    const lang = i18next.language === 'en' ? 'enUS' : i18next.language 
    return formatDuration(intervalToDuration({ start, end }), {
        locale: locales[lang],
        format: units
    })
}


export function fmtDistanceStrict (date, baseDate) {
    const lang = i18next.language === 'en' ? 'enUS' : i18next.language 
    return formatDistanceStrict(date, baseDate, {
        locale: locales[lang],
    })
}




export function fmt (date, formatStr = 'PP') {
    const lang = i18next.language === 'en' ? 'enUS' : i18next.language 
    return format(date, formatStr, {
    locale: locales[lang] 
  })
}
