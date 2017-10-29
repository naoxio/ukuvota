import Vuex from 'vuex'
import Vue from 'vue'

import i18nPlugin from './plugins/i18n'
import * as time from './modules/time'
import * as settings from './modules/settings'
import * as topic from './modules/topic'
import * as i18n from './modules/i18n'

Vue.use(Vuex)

/*
  resHover = results emoji hover
*/
const store = new Vuex.Store({
  modules: {
    time,
    settings,
    topic,
    i18n
  },
  plugins: [
    i18nPlugin
  ]
})

export default store
