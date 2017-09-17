import { LocalStorage } from 'quasar'
import * as firebase from 'firebase'

const database = 'firebase'

// firebase topic
const addFirebaseTopic = (id, newTopic) => {
  var updates = {}
  updates['/topics/' + id] = newTopic
  firebase.database().ref().update(updates)
}
/*
const updateFirebaseTopic = (id, changedTopic) => {
  firebase.database().ref('topics/').transaction(function (topic) {
    if (topic) {
      topic[id] = changedTopic
    }
    return topic
  })
} */

const getFirebaseTopic = (id) => {
  let topic = -1
  firebase.database().ref('topics/' + id).on('value', function (snapshot) {
    topic = snapshot.val()
  })
  return topic
}

const setFirebaseTopic = (topic) => {
  addFirebaseTopic(topic.id, topic)
  let t = getFirebaseTopic(topic.id)
  console.log(t)
//  updateFirebaseTopic(topic.id, topic)
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
  let topic = -1
  switch (database) {
    case 'firebase':
      topic = getFirebaseTopic(id)
      break
    default:
      topic = JSON.parse(LocalStorage.get.item(id))
  }
  return topic
}

const addProperty = (id, prop, key, value) => {
  let topic = getTopic(id)
  topic[prop][key] = value
  setTopic(topic)
}

export const addProposal = (id, title, description) => {
  addProperty(id, 'proposals', title, description)
  addProperty(id, 'emojis', title, 0)
  return true
}

export const getEmojis = (id) => {
  let topic = getTopic(id)
  return topic.emojis
}

export const getProposals = (id) => {
  let topic = getTopic(id)
  return topic.proposals
}

export const setVotes = (id, name, emojis) => {
  let topic = getTopic(id)

  if (topic.votes[name] === undefined) topic.votes[name] = emojis
  else return -2

  setTopic(topic)
}

export const getVotes = (id) => {
  let topic = getTopic(id)
  return topic.votes
}

export const setResults = (id, results) => {
  let topic = getTopic(id)
  if (topic.results === undefined) topic.results = results
  else return -2
}
