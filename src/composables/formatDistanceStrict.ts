import { formatDistanceStrict } from 'date-fns'
import { enUS, de } from 'date-fns/locale/index'
import i18next from 'i18next'

const locales = {enUS, de}

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export default function (date, baseDate) {
    const lang = i18next.language === 'en' ? 'enUS' : i18next.language 
    return formatDistanceStrict(date, baseDate, {
        locale: locales[lang],
    })
}
