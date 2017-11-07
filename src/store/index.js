import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

import * as time from './modules/time'
import * as settings from './modules/settings'
import * as topic from './modules/topic'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

/*
  resHover = results emoji hover
*/
const store = new Vuex.Store({
  modules: {
    time,
    settings,
    topic
  },
  plugins: [vuexLocal.plugin]
})

export default store
