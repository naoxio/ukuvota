import Gun from 'gun'

let gun = Gun()

// set topic in gun
export const setTopic = (topic) => {
  return gun.get(topic.id).put(topic)
}

export const getTopic = (id) => {
  return gun.get(id)
}

export const setProposal = (id, key, proposal) => {
  return gun.get(id).get(key).set(proposal)
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
