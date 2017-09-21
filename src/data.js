import { LocalStorage } from 'quasar'
import Gun from 'gun'

let gun = Gun()

export const createNewTopic = (id) => {
  gun.get(id).put({
    id

  })
}
// general data methods
export const setTopic = (topic) => {
  Promise.resolve(LocalStorage.set(topic.id, JSON.stringify(topic)))
}

export const getTopic = (id) => {
  return gun.get(id)
}

const setProperty = (id, prop, key, value) => {
  return getTopic(id).then(topic => {
    topic[prop][key] = value
    setTopic(topic)
  })
}

export const addProposal = (id, title, description) => {
  return setProperty(id, 'proposals', title, description).then(
    function () {
      setProperty(id, 'emojis', title, 0)
    }
  )
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
