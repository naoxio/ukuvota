import { date } from 'quasar'
import { addDays } from 'date-fns'

export const state = {
  proposalDeadline: addDays(new Date(), 3),
  voteDeadline: addDays(new Date(), 4)
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
    /* let propMilli = moment(state.proposalDeadline).millisecond()
    let voteMilli = moment(state.voteDeadline).millisecond()
    let diff = 0
    // moment(val).subtract(state.voteDeadline.milliseconds(), 'milliseconds')
    if (propMilli > voteMilli) diff = propMilli - voteMilli
    else if (voteMilli > propMilli) diff = voteMilli - propMilli
    state.voteDeadline = new Date(val.getTime() + diff)
    state.proposalDeadline = val */
  },
  setVoteDeadline: (state, val) => { state.voteDeadline = val }
}

export const getters = {
  getProposalDeadline: state => state.proposalDeadline,
  getVoteDeadline: state => state.voteDeadline,
  getProposalDuration: state => state.proposalDeadline, // moment(state.proposalDeadline).fromNow(),
  getVoteDuration: state => state.proposalDeadline, // moment(state.voteDeadline).locale('de').fromNow(),
  getProposalDeadlineFormatted: state => state.proposalDeadline, // state => moment(state.proposalDeadline).format('MMM DD, YYYY HH:MM'),
  getVoteDeadlineFormatted: state => state.proposalDeadline // moment(state.voteDeadline).format('MMM DD, YYYY HH:MM')

}
