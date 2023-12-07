import { enUS, de } from 'date-fns/locale/index'
import i18next from 'i18next'

const locales = {enUS, de}

const lang = i18next.language === 'en' ? 'enUS' : i18next.language 

export default function() {
    return locales[lang]
}