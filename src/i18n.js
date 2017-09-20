import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LocalStorage } from 'quasar'

Vue.use(VueI18n)

const getLocale = () => {
  let local = LocalStorage.get.item('locale')
  if (local === null) local = 'en'
  return local
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
