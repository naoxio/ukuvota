import Vuex from 'vuex'
import Vue from 'vue'
import { LocalStorage, date } from 'quasar'

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
    resHover: getLocal('resHover', { none: false, avg: true, total: false }),
    topic: {},
    proposals: {},
    votes: {},
    negativeScoreWeight: {},
    selectedVoters: {},
    proposalDeadline: new Date(new Date().getTime() + 3 * 86400000), // 86400000 is 1 day in milliseconds
    voteDeadline: new Date(new Date().getTime() + 4 * 86400000)
  },
  actions: {
    updateTheme: ({ commit }, val) => commit('setTheme', val),
    updateResHover: ({ commit }, val) => commit('setResHover', val),
    updateTopic: ({ commit }, val) => commit('setTopic', val),
    updateSelectedVoters: ({ commit }, val) => commit('setSelectedVoters', val),
    updateProposalDeadline: ({ commit }, val) => commit('setProposalDeadline', val),
    updateVoteDeadline: ({ commit }, val) => commit('setVoteDeadline', val)
  },
  mutations: {
    setTheme: (state, val) => { setLocal('theme', val); state.theme = val },
    setResHover: (state, val) => { setLocal('resHover', val); state.resHover = val },
    setTopic: (state, val) => {
      state.topic = val
      state.proposals = val.proposals
      state.votes = val.votes
      state.selectedVoters = Object.keys(val.votes)
      state.negativeScoreWeight = val.negativeScoreWeight
    },
    setSelectedVoters: (state, val) => { state.selectedVoters = val },
    setProposalDeadline: (state, val) => {
      let propMilli = date.formatDate(state.proposalDeadline, 'x')
      let voteMilli = date.formatDate(state.voteDeadline, 'x')
      let diff = 0
      if (propMilli > voteMilli) diff = propMilli - voteMilli
      else if (voteMilli > propMilli) diff = voteMilli - propMilli
      state.voteDeadline = new Date(val.getTime() + diff)
      state.proposalDeadline = val
    },
    setVoteDeadline: (state, val) => { state.voteDeadline = val }
  },
  getters: {
    getProposalDeadlineFormatted: state => date.formatDate(state.proposalDeadline, 'MMM DD, YYYY HH:MM'),
    getVoteDeadlineFormatted: state => date.formatDate(state.voteDeadline, 'MMM DD, YYYY HH:MM'),
    getProposalDeadline: state => state.proposalDeadline,
    getVoteDeadline: state => state.voteDeadline
  }
})

export default store
