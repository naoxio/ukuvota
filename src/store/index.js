import Vuex from 'vuex'
import Vue from 'vue'

import * as time from './modules/time'
import * as settings from './modules/settings'
import * as topic from './modules/topic'

Vue.use(Vuex)

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
