import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import * as time from './modules/time'
import * as settings from './modules/settings'
import * as topic from './modules/topic'

/*
  resHover = results emoji hover
*/
const store = new Vuex.Store({
  modules: {
    time,
    settings,
    topic
  }
})

export default store
