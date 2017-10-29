import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const messages = {
  en: require('locales/en.yml'),
  de: require('locales/de.yml')
}

export const locales = [
  { locale: 'de', name: 'Deutsch' },
  { locale: 'en', name: 'English' }
]

const defaultDateTimeFormat = {
  timeShort: {
    hour: 'numeric',
    minute: 'numeric'
  },
  dateShort: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  },
  dayName: {
    weekday: 'long'
  }
}

let dateTimeFormats = {}
for (const locale of locales) {
  dateTimeFormats[locale.locale] = defaultDateTimeFormat
}

const i18n = new VueI18n({
  messages,
  dateTimeFormats,
  fallbackLocale: 'en' // if you change this make sure to always load the locale too
})

export default i18n

if (module.hot) {
  module.hot.accept([
    'locales/en.yml'
  ], () => {
    i18n.setLocaleMessage('en', require('locales/en.yml'))
  })
}
