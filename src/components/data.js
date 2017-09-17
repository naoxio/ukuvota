import { LocalStorage } from 'quasar'
import * as firebase from 'firebase'

const database = 'localstorage'

export const saveTopicToFirebase = (newTopic) => {
  // firebase update
  // get a key for a new topic.
  var newTopicKey = firebase.database().ref().child('topics').push().key
  // write the new topics's data in the topics list
  var updates = {}
  updates['/topics/' + newTopicKey] = newTopic
  firebase.database().ref().update(updates)
}

export const setTopic = (topic) => {
  switch (database) {
    case 'firebase':
      break
    default:
      LocalStorage.set(topic.id, JSON.stringify(topic))
  }
}

export const getTopic = (id) => {
  let topic = -1
  switch (database) {
    case 'firebase':
      firebase.database().ref('topics').on('value', function (snapshot) {
        topic = snapshot.val()
      })
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
