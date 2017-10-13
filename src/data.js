import PouchDB from 'pouchdb'

const BACKEND_URL = location.protocol + '//' + location.host + '/db'
let db = new PouchDB(BACKEND_URL + '/topics')
window.PouchDB = PouchDB

// set topic in db
export const setTopic = (topic) => {
  return db.put(topic).then().catch(() => {
    return db.get(topic._id).then(doc => {
      topic._rev = doc._rev
      return db.put(topic)
    }).then().catch(err => {
      return err
    })
  })
}

export const getTopic = (id) => {
  return db.get(id).then(doc => {
    return doc
  }).then().catch(err => {
    return err
  })
}

export const setProposal = (id, obj) => {
  return getTopic(id).then(topic => {
    // add proposal
    topic.proposals[obj.id] = {
      description: obj.description,
      title: obj.title
    }
    topic.emojis[obj.id] = 0
    // put them back
    return db.put(topic)
  })
}

export const getProposals = (id) => {
  return getTopic(id).then(topic => {
    return topic.proposals
  }).then().catch(err => {
    console.log(err)
    return -1
  })
}

export const setVotes = (id, name, emojis) => {
  return getTopic(id).then(topic => {
    // add proposal
    if (topic.votes === undefined) topic.votes = {}
    if (topic.votes[name] === undefined) topic.votes[name] = emojis
    else return -2
    // put them back
    return db.put(topic)
  }).then().catch(err => {
    console.log(err)
    return -1
  })
}

export const getVotes = (id) => {
  return getTopic(id).then(topic => {
    return topic.votes
  }).then().catch(err => {
    console.log(err)
    return -1
  })
}
