import { date } from 'quasar'

export const state = {
  proposalDeadline: new Date(new Date().getTime() + 3 * 86400000), // 86400000 is 1 day in milliseconds
  voteDeadline: new Date(new Date().getTime() + 4 * 86400000)
}

export const actions = {
  updateProposalDeadline: ({ commit }, val) => commit('setProposalDeadline', val),
  updateProposalDeadlineSync: ({ commit }, val) => commit('setProposalDeadlineSync', val),
  updateVoteDeadline: ({ commit }, val) => commit('setVoteDeadline', val),
  updateVoteDeadlineSync: ({ commit }, val) => commit('setVoteDeadline', val)
}

export const mutations = {
  setProposalDeadline: (state, val) => {
    let propMilli = date.formatDate(val, 'x')
    let voteMilli = date.formatDate(state.voteDeadline, 'x')
    if (propMilli > voteMilli) state.voteDeadline = val
    state.proposalDeadline = val
  },
  setProposalDeadlineSync: (state, val) => {
    let propMilli = date.formatDate(state.proposalDeadline, 'x')
    let voteMilli = date.formatDate(state.voteDeadline, 'x')
    let diff = 0
    if (propMilli > voteMilli) diff = propMilli - voteMilli
    else if (voteMilli > propMilli) diff = voteMilli - propMilli
    state.voteDeadline = new Date(val.getTime() + diff)
    state.proposalDeadline = val
  },
  setVoteDeadline: (state, val) => { state.voteDeadline = val }
}

export const getters = {
  getProposalDeadlineFormatted: state => date.formatDate(state.proposalDeadline, 'MMM DD, YYYY HH:MM'),
  getVoteDeadlineFormatted: state => date.formatDate(state.voteDeadline, 'MMM DD, YYYY HH:MM'),
  getProposalDeadline: state => state.proposalDeadline,
  getVoteDeadline: state => state.voteDeadline
}
