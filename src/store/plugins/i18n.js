import i18n from 'src/i18n'

export default store => {
  store.watch(state => state.i18n.locale, async locale => {
    const messages = await import(`locales/${locale}.yml`)
    i18n.setLocaleMessage(locale, messages)
    i18n.locale = locale
  }, {immediate: true})
}
