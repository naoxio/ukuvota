import { LocalStorage } from 'quasar'

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

export const saveTopic = (id, topic) => {
  let index = getTopicIndex(id)
  let topics = getTopics()

  // update topic object by replacing it
  let updatedTopic = {
    'question': topic.question,
    'proposalTime': '0',
    'votingTime': topic.votingTime,
    'votingInterval': topic.votingInterval,
    'description': topic.description,
    'id': topic.id,
    'proposals': topic.proposals
  }
  topics[index] = updatedTopic

  // update localstorage topics content
  LocalStorage.set('topics', JSON.stringify(topics))
  return true
}
