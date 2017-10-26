export const genMax = (object) => {
  let max = -999999999
  for (let key in object) {
    if (max < object[key]) max = object[key]
  }
  return max
}

export const getOrderedList = (selectedVoters, proposals, votes, negativeScoreWeight) => {
  let results = {}
  for (let x = 0; x < selectedVoters.length; x++) {
    getResultForName(selectedVoters[x], proposals, votes, negativeScoreWeight, results)
  }
  if (Object.keys(results).length !== 0) {
    // create an ordered lists with the highest score on top
    let myObj = results
    let sortedResults = {}
    sortedResults = Object.keys(myObj).sort((a, b) => myObj[b] - myObj[a]).reduce((_sortedObj, key) => ({
      ..._sortedObj,
      [key]: myObj[key]
    }), {})
    return sortedResults
  }
  else {
    return -1
  }
}

export const getResults = (selectedVoters, proposals, votes, negativeScoreWeight) => {
  let results = {}
  for (let x = 0; x < selectedVoters.length; x++) {
    results = getResultForName(selectedVoters[x], proposals, votes, negativeScoreWeight, results)
  }
  return results
}

const getResultForName = (name, proposals, votes, negativeScoreWeight, results) => {
  for (let proposal in proposals) {
    let vote = votes[name][proposal]
    if (vote < 0) vote = vote * negativeScoreWeight
    if (results[proposal] === undefined) {
      results[proposal] = vote
    }
    else {
      results[proposal] = results[proposal] + vote
    }
  }
  return results
}

export const getAvgScore = (id, results, selectedVoters) => {
  return Math.round((results[id] / selectedVoters.length) * 100) / 100
}

export const getTotalScore = (id, results) => {
  return results[id]
}

export const getIndiScore = (object, id, negativeScoreWeight) => {
  let score = object[id]
  if (score < 0) score = score * negativeScoreWeight
  return score
}

export const getAvgRoundedScore = (id, results, selectedVoters) => {
  return Math.round((getAvgScore(id, results, selectedVoters)) * 100) / 100
}

export const getLength = (object) => {
  return Object.keys(object).length
}
