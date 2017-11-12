import { getTime, differenceInMilliseconds, isBefore, isAfter, noTimeDate, addDays, distanceInWords, distanceInWordsToNow } from 'src/helpers/datefns'

export const state = {
  proposalDeadline: noTimeDate(addDays(new Date(), 3)),
  proposalDuration: distanceInWordsToNow(noTimeDate(addDays(new Date(), 3))),
  voteDeadline: noTimeDate(addDays(new Date(), 5)),
  voteDuration: distanceInWords(noTimeDate(addDays(new Date(), 3)), noTimeDate(addDays(new Date(), 5)))
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
  getVoteDuration: state => state.voteDuration

}
