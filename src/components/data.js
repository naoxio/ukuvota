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
export const getTopic = (id) => {
  let topics = getTopics()
  let index = getTopicIndex(id)
  if (index === -1) {
    return -1
  }
  return topics[index]
}

export const getProposals = (id) => {
  let topic = getTopic(id)
  return topic.proposals
}

export const setProposals = (id, proposals) => {
  let index = getTopicIndex(id)
  let topics = getTopics()
  let topic = topics[index]
  // update topic object by replacing it
  let updatedTopic = {
    'question': topic.question,
    'proposalTime': '0',
    'votingTime': topic.votingTime,
    'votingInterval': topic.votingInterval,
    'description': topic.description,
    'id': topic.id,
    'proposals': proposals
  }
  topics[index] = updatedTopic

  // update localstorage topics content
  LocalStorage.set('topics', JSON.stringify(topics))
  return true
}
