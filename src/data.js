// set topic in gun
export const setTopic = (topic) => {
  return -1
  //  return gun.get(topic.id).put(topic)
}

export const getTopic = (id) => {
  return -1
  //  return gun.get(id)
}

export const setProposal = (id, title, description) => {
  return -1
  // return gun.get(id).get('proposals').get(title).put(description)
}

export const getProposals = (id) => {
  return -1
  // return gun.get(id).get('proposals')
}

export const getProposal = (id, title) => {
  return -1
  // return gun.get(id).get('proposals').get(title)
}

export const addVotes = (id, name, emojis) => {
  return getTopic(id).then(topic => {
    if (topic.votes === undefined) topic.votes = {}
    if (topic.votes[name] === undefined) topic.votes[name] = emojis
    else return -2
    setTopic(topic)
  })
}

export const setResults = (id, results) => {
  return getTopic(id).then(topic => {
    if (topic.results === undefined) topic.results = results
    else return -2
  })
}
