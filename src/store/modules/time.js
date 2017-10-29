import { getTime, differenceInMilliseconds, isBefore, isAfter, addDays, format, distanceInWordsToNow } from 'src/datefns'

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
    if (isBefore(val, state.voteDeadline)) state.voteDeadline = val
    state.proposalDeadline = val
  },
  setProposalDeadlineSync: (state, val) => {
    let prop = state.proposalDeadline
    let vote = state.voteDeadline
    // moment(val).subtract(state.voteDeadline.milliseconds(), 'milliseconds')
    let diff = 0
    if (isAfter(prop, vote)) diff = differenceInMilliseconds(prop, vote)
    else if (isAfter(vote, prop)) diff = differenceInMilliseconds(vote, prop)
    state.voteDeadline = new Date(getTime(val) + diff)
    state.proposalDeadline = val
  },
  setVoteDeadline: (state, val) => { state.voteDeadline = val }
}

export const getters = {
  getProposalDeadline: state => state.proposalDeadline,
  getVoteDeadline: state => state.voteDeadline,
  getProposalDuration: state => distanceInWordsToNow(state.proposalDeadline),
  getVoteDuration: state => distanceInWordsToNow(state.voteDeadline),
  getProposalDeadlineFormatted: state => format(state.proposalDeadline, 'MMM DD, YYYY HH:MM'),
  getVoteDeadlineFormatted: state => format(state.voteDeadline, 'MMM DD, YYYY HH:MM')

}
