import {astroI18n} from 'astro-i18n'

const locales = {enUS, de}

const lang = astroI18n.locale === 'en' ? 'enUS' : astroI18n.locale 

export default function() {
    return locales[lang]
}