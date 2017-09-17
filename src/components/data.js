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

const getTopics = () => {
  switch (database) {
    case 'firebase':
      firebase.database().ref('topics').on('value', function (snapshot) {
        return snapshot.val()
      })
      break
    default:
      return JSON.parse(LocalStorage.get.item('topics'))
  }
}

const setTopics = (topics) => {
  switch (database) {
    case 'firebase':
      break
    default:
      LocalStorage.set('topics', JSON.stringify(topics))
  }
}

const setTopicLocalStorage = (topic) => {
  let topics = getTopics()

  // if localstorage item 'topics' doesnt exist create empty array
  if (topics === null) {
    topics = []
    topics.push(topic)
  }
  topics[topic] = topic
  console.log(topics)
  setTopics(topics)
}

export const setTopic = (newTopic) => {
  switch (database) {
    case 'firebase':
      break
    default:
      setTopicLocalStorage(newTopic)
  }
}

export const getTopic = (id) => {
  let topics = getTopics()
  if (topics === null) return -1
  let index = getTopicIndex(id, topics)
  if (index === -1) return -1
  return topics[index]
}

const getTopicIndex = (id, topics) => {
  let index = -1
  for (let x = 0; x < topics.length; x++) {
    if (topics[x].id === id) {
      index = x
    }
  }
  return index
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
  let topics = getTopics()
  let index = getTopicIndex(id, topics)

  if (topics[index].votes[name] === undefined) topics[index].votes[name] = emojis
  else return -2

  setTopics(topics)
}

export const getVotes = (id) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)
  return topics[index].votes
}

export const setResults = (id, results) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)
  if (topics[index].results === undefined) topics[index].results = results
  else return -2
}
