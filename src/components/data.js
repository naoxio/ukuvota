import { LocalStorage, date } from 'quasar'
import * as firebase from 'firebase'

const { addToDate } = date

const getTopics = () => {
  return JSON.parse(LocalStorage.get.item('topics'))
}

const getTopicIndex = (id) => {
  let topics = getTopics()
  let index = -1
  for (let x = 0; x < topics.length; x++) {
    if (topics[x].id === id) {
      index = x
    }
  }
  return index
}
export const loadTopic = (id) => {
  let topics = getTopics()
  let index = getTopicIndex(id)
  console.log(index)
  if (index === -1) {
    return -1
  }
  let topic = topics[index]
  // this.setVotingTimer()
  // this.startIntervalUpdate()
  // this.$route.params.id
  return topic
}

export const saveTopic = (id) => {
  let index = getTopicIndex(id)
  let topics = getTopics()
  let today = new Date()
  let topic = topics[index]
  let endVoting = addToDate(today, {days: topic.votingTime})

  // update topic object by replacing it
  let updatedTopic = {
    'topicQuestion': topic.question,
    'proposalTime': '0',
    'votingTime': endVoting,
    'description': topic.description,
    'id': topic.id,
    'proposals': topic.proposals
  }
  topics[index] = updatedTopic

  // update localstorage topics content
  LocalStorage.set('topics', JSON.stringify(topics))

  return true
}

export const saveTopicToFirebase = (newTopic) => {
  // firebase update
  // get a key for a new topic.
  var newTopicKey = firebase.database().ref().child('topics').push().key
  // write the new topics's data in the topics list
  var updates = {}
  updates['/topics/' + newTopicKey] = newTopic
  firebase.database().ref().update(updates)
}
