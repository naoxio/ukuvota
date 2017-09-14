import { LocalStorage } from 'quasar'

const getTopics = () => {
  return JSON.parse(LocalStorage.get.item('topics'))
}

const setTopics = (topics) => {
  LocalStorage.set('topics', JSON.stringify(topics))
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

const addProperty = (id, prop, key, value) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)
  topics[index][prop][key] = value
  console.log(prop, key, value)
  setTopics(topics)
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

export const setEmojis = (id, title, value) => {
  addProperty(id, 'emojis', title, value)
  return true
}

export const setVotes = (id, name) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)

  if (topics[index].votes[name] === undefined) topics[index].votes[name] = topics[index].emojis
  else return -2

  setTopics(topics)
}

export const getVotes = (id) => {
  let topics = getTopics()
  let index = getTopicIndex(id, topics)
  return topics[index].votes
}
