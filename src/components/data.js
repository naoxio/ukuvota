import { LocalStorage } from 'quasar'
import * as firebase from 'firebase'

const database = 'firebase'

// firebase topic
const addFirebaseTopic = (id, newTopic) => {
  var updates = {}
  updates['/topics/' + id] = newTopic
  firebase.database().ref().update(updates)
}

const updateFirebaseTopic = (id, changedTopic) => {
  firebase.database().ref('topics/').transaction(function (topic) {
    if (topic) {
      topic[id] = changedTopic
    }
    return topic
  })
}

const getFirebaseTopic = (id) => {
  return firebase.database().ref('topics/' + id).once('value').then(function (snapshot) {
    console.log('getFirebaseTopic', snapshot.val)
    return snapshot.val()
  })
}

const setFirebaseTopic = (topic) => {
  if (getFirebaseTopic(topic.id) !== -1) {
    updateFirebaseTopic(topic.id, topic)
  }
  else {
    addFirebaseTopic(topic.id, topic)
  }
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
  return getTopic(this.id).then(topic => {
    topic[prop][key] = value
    setTopic(topic)
  })
}

export const addProposal = (id, title, description) => {
  setProperty(id, 'proposals', title, description)
  setProperty(id, 'emojis', title, 0)
  return true
}

export const getEmojis = (id) => {
  return getTopic(this.id).then(topic => {
    return topic.emojis
  })
}

export const getProposals = (id) => {
  return getTopic(this.id).then(topic => {
    return topic.proposals
  })
}

export const setVotes = (id, name, emojis) => {
  return getTopic(this.id).then(topic => {
    if (topic.votes[name] === undefined) topic.votes[name] = emojis
    else return -2
    setTopic(topic)
  })
}

export const getVotes = (id) => {
  return getTopic(this.id).then(topic => {
    return topic.votes
  })
}

export const setResults = (id, results) => {
  return getTopic(this.id).then(topic => {
    if (topic.results === undefined) topic.results = results
    else return -2
  })
}
