import { getTime, differenceInMilliseconds, isBefore, isAfter, addDays, format, distanceInWords, distanceInWordsToNow } from 'src/datefns'

export const state = {
  proposalDeadline: addDays(new Date(), 3),
  proposalDuration: distanceInWordsToNow(addDays(new Date(), 3)),
  voteDeadline: addDays(new Date(), 4),
  voteDuration: distanceInWords(addDays(new Date(), 3), addDays(new Date(), 4))
}

export const actions = {
  updateProposalDeadline: ({ commit }, val) => { commit('setProposalDeadline', val); commit('setDurations') },
  updateProposalDeadlineSync: ({ commit }, val) => { commit('setProposalDeadlineSync', val); commit('setDurations') },
  updateVoteDeadlineSync: ({ commit }, val) => { commit('setVoteDeadline', val); commit('setDurations') },
  updateDurations: ({ commit }, val) => commit('setDurations')
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
  setDurations: state => {
    state.proposalDuration = distanceInWordsToNow(state.proposalDeadline)
    state.voteDuration = distanceInWords(state.proposalDeadline, state.voteDeadline)
  },
  setVoteDeadline: (state, val) => { state.voteDeadline = val }
}

export const getters = {
  getProposalDeadline: state => state.proposalDeadline,
  getVoteDeadline: state => state.voteDeadline,
  getProposalDuration: state => state.proposalDuration,
  getVoteDuration: state => state.voteDuration,
  getProposalDeadlineFormatted: state => format(state.proposalDeadline, 'MMM DD, YYYY HH:MM'),
  getVoteDeadlineFormatted: state => format(state.voteDeadline, 'MMM DD, YYYY HH:MM')

}
