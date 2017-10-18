import Vuex from 'vuex'
import Vue from 'vue'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

const getLocal = (item, given) => {
  let local = LocalStorage.get.item(item)
  if (local === null) return given
  return local
}

const store = new Vuex.Store({
  state: {
    theme: getLocal('theme', 'light')
  },
  actions: {
    updateTheme: ({ commit }, newVal) => commit('setTheme', newVal)
  },
  mutations: {
    setTheme: (state, newVal) => { state.theme = newVal }
  },
  getters: {
    getTheme: state => state.theme
  }
})

export default store
