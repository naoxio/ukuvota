import { LocalStorage, date } from 'quasar'

const { addToDate } = date

export const loadData = (route) => {
  let topics = JSON.parse(LocalStorage.get.item('topics'))
  let index = -1
  for (let x = 0; x < topics.length; x++) {
    if (topics[x].id === route) {
      index = x
    }
  }
  if (index === -1) {
    return -1
  }
  let topic = topics[index]
  // this.setVotingTimer()
  // this.startIntervalUpdate()
  // this.$route.params.id
  return topic
}

export const saveData = (topics, index) => {
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
