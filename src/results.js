
export const getOrderedList = (results) => {
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
  const score = getAvgScore(id, results, selectedVoters)
  return score.toPrecision(3).slice(0, score > 0 ? 4 : 5)
}

export const getLength = (object) => {
  return Object.keys(object).length
}

const genMax = (results) => {
  let max = -999999999
  for (let key in results) {
    if (max < results[key]) max = results[key]
  }
  return max
}

export const getTotalEmoji = (id, negativeScore, results, votes) => {
  let length = getLength(votes)
  let multiplier = negativeScore - 1
  let p = getTotalScore(id, results)
  let emo = 0
  let max = genMax(results)
  if (p === max) emo = 3
  else if (p >= max - length) emo = 2
  else if (p >= max - length * 2) emo = 1
  else if (p >= max - length * 3) emo = 0
  else if (p >= max - length * 4 * multiplier) emo = -1
  else if (p >= max - length * 5 * multiplier) emo = -2
  else emo = -3
  return emo
}

export const getAvgEmoji = (id, negativeScore, avgScore) => {
  let emo = Math.round(avgScore)
  if (emo < 0) {
    emo = Math.round(emo / negativeScore)
  }
  return emo
}
