export const state = {
  topic: {},
  proposals: {},
  votes: {},
  negativeScoreWeight: {},
  selectedVoters: {}
}

export const actions = {
  updateTopic: ({ commit }, val) => commit('setTopic', val),
  updateSelectedVoters: ({ commit }, val) => commit('setSelectedVoters', val)
}

export const mutations = {
  setTopic: (state, val) => {
    state.topic = val
    state.proposals = val.proposals
    state.votes = val.votes
    state.selectedVoters = Object.keys(val.votes)
    state.negativeScoreWeight = val.negativeScoreWeight
  },
  setSelectedVoters: (state, val) => { state.selectedVoters = val }
}
