import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LocalStorage } from 'quasar'

const DEFAULT_LOCALE = 'en'
const LOCALES = ['en', 'de']

const detectLocale = () => {
  // Based on https://angular-translate.github.io/docs/#/guide/07_multi-language#multi-language_determining-preferred-language-automatically
  let val =
    navigator.languages[0] ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.userLanguage
  if (val) {
    return val.replace(/-.*$/, '')
  }
}

Vue.use(VueI18n)

const getLocale = () => {
  let locale = LocalStorage.get.item('locale')
  if (locale === null) {
    let val = detectLocale()
    if (LOCALES.includes(val)) {
      locale = val
    }
    else locale = DEFAULT_LOCALE
  }
  return locale
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages: {
    en: require('locales/en.yml'),
    de: require('locales/de.yml')
  }
})

export default i18n

if (module.hot) {
  module.hot.accept([
    'locales/en.yml',
    'locales/de.yml'
  ], () => {
    i18n.setLocaleMessage('en', require('locales/en.yml'))
    i18n.setLocaleMessage('de', require('locales/de.yml'))
  })
}
