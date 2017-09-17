import { LocalStorage } from 'quasar'
import * as firebase from 'firebase'

const database = 'firebase'

// firebase topic
const addFirebaseTopic = (newTopic) => {
  var updates = {}
  updates['/topics/' + newTopic.id] = newTopic
  firebase.database().ref().update(updates)
}
/*
const updateFirebaseTopic = (changedTopic) => {
  firebase.database().ref('topics/').transaction(function (topic) {
    if (topic) {
      topic[changedTopic.id] = changedTopic
    }
    return topic
  })
}
*/
const getFirebaseTopic = (id) => {
  return firebase.database().ref('topics/' + id).once('value').then(function (snapshot) {
    return snapshot.val()
  })
}

const setFirebaseTopic = (topic) => {
  addFirebaseTopic(topic)
}

// general data methods
export const setTopic = (topic) => {
  switch (database) {
    case 'firebase':
      setFirebaseTopic(topic)
      break
    default:
      LocalStorage.set(topic.id, JSON.stringify(topic))
  }
}

export const getTopic = (id) => {
  switch (database) {
    case 'firebase':
      return getFirebaseTopic(id)
    default:
      return Promise.resolve(JSON.parse(LocalStorage.get.item(id)))
  }
}
const setProperty = (id, prop, key, value) => {
  return getTopic(id).then(topic => {
    topic[prop][key] = value
    setTopic(topic)
  })
}

export const addProposal = (id, title, description) => {
  return setProperty(id, 'proposals', title, description).then(
  setProperty(id, 'emojis', title, 0)
  )
}

export const setVotes = (id, name, emojis) => {
  return getTopic(id).then(topic => {
    if (topic.votes[name] === undefined) topic.votes[name] = emojis
    else return -2
    setTopic(topic)
  })
}

export const getVotes = (id) => {
  return getTopic(id).then(topic => {
    return topic.votes
  })
}

export const setResults = (id, results) => {
  return getTopic(id).then(topic => {
    if (topic.results === undefined) topic.results = results
    else return -2
  })
}
