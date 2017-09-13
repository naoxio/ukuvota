import { LocalStorage } from 'quasar'

const getTopics = () => {
  return JSON.parse(LocalStorage.get.item('topics'))
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
export const getTopic = (id) => {
  let topics = getTopics()
  if (topics === null) return -1
  let index = getTopicIndex(id, topics)
  if (index === -1) return -1
  return topics[index]
}

export const addProposal = (id, title, description) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)

  // update topic proposals
  topics[index].proposals[title] = description
  topics[index].emojis[title] = 0

  // update localstorage topics content
  LocalStorage.set('topics', JSON.stringify(topics))
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

export const setEmojis = (id, title, value) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)

  // update topic proposals
  topics[index].emojis[title] = value

  // update localstorage topics content
  LocalStorage.set('topics', JSON.stringify(topics))
  return true
}
