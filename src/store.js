import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hash: 'Vasya'
  },
  actions: {
    UPDATE_CREDENTIALS: function ({ commit }, newHash) {
      commit('SET_CREDENTIALS', newHash)
    }
  },
  mutations: {
    SET_CREDENTIALS: (state, newHash) => {
      state.hash = newHash
    }
  },
  getters: {
    GET_CREDENTIALS: state => {
      return state.hash
    }
  }
})

export default store
