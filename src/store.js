import Vuex from 'vuex'
import Vue from 'vue'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

const getLocal = (item, given) => {
  let local = LocalStorage.get.item(item)
  if (local === null) return given
  return local
}
const setLocal = (item, val) => {
  LocalStorage.set(item, val)
}
/*
  resHover = results emoji hover
*/
const store = new Vuex.Store({
  state: {
    theme: getLocal('theme', 'light'),
    resHover: getLocal('resHover', { none: false, avg: true, total: false })
  },
  actions: {
    updTheme: ({ commit }, val) => commit('setTheme', val),
    updResHover: ({ commit }, val) => commit('setResHover', val)
  },
  mutations: {
    setTheme: (state, val) => { setLocal('theme', val); state.theme = val },
    setResHover: (state, val) => { setLocal('resHover', val); state.resHover = val }
  },
  getters: {
    getTheme: state => state.theme,
    getResHover: state => state.resHover
  }
})

export default store
