import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import db from './db.mjs'
import { WebSocketServer } from 'ws';

const getTimestamp = (minutes, hours, days) => {
  console.log(minutes, hours, days)
  let rtn = 0
  rtn += parseInt(minutes) * 60 * 1000
  rtn += parseInt(hours) * 3600 * 1000
  rtn += parseInt(days) * 24 * 3600 * 1000
  return rtn
}

const app = express();
const process_map = new Map();
const user_map = new Map();

app.use(express.static('dist/client/'));
app.use(ssrHandler);
app.use(express.json())

app.get('/api/quick/process/:id', async(req, res) => {
  const process = await db.get(req.params.id)
  res.json({ process })
});

app.post('/api/quick/process/:id/vote', async(req, res) => {
  const processId = req.params.id
  const process = await db.get(processId)
  const body = req.body
  const votes = []
  body.votes.forEach((vote) => {
    votes.push({
      proposalId: vote.proposalId,
      vote: vote.vote
    })
  })
  const vote = {
    name: body.name,
    votes
  }
  if (process.voters)
    process.voters.push(vote) 
  else
    process.voters = [vote]

  await db.put(processId, JSON.stringify(process))
  res.json({})
});

app.post('/api/quick/process', async(req, res) => {
  const body = req.body
  const uuid = crypto.randomUUID()
  const proposalEnd = +new Date() + getTimestamp(body.proposalMinutes, body.proposalHours, body.proposalDays)
  const votingEnd = proposalEnd + getTimestamp(body.votingMinutes, body.votingHours, body.votingDays)
  let proposals = []
  if (body.proposals) {
    for (let i = 0; i < body.proposals.length; i++) {
      const proposalId = crypto.randomUUID()
      const proposal = body.proposals[i]
      proposals.push({
        id: proposalId,
        title: proposal.title,
        description: proposal.description,
        createdAt: +new Date(),
      })
    }
  }
  const process = {
    title: body.topicQuestion,
    description: body.topicDescription,
    proposalEnd: new Date(proposalEnd).toISOString(),
    votingEnd: new Date(votingEnd).toISOString(),
    strategy: body.strategy,
    weighting: body.weighting,
    proposals,
  }
  await db.put(uuid, JSON.stringify(process))

  res.json({id: uuid})
})

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', async (ws, req) => {
  const userId = crypto.randomUUID()
  user_map.set(userId, [])
  ws.on('message', async(message) => {
    let data = JSON.parse(message)
    const processId = data.processId
    const users = process_map.get(processId)

    if ('method' in data) {
      if (data.method === 'setProcess') {
        let users = process_map.get(data.processId)
        if (!users)
          users = []
        
        users.push({
          id: userId,
          ws
        })
        process_map.set(processId, users)

        let processes = user_map.get(userId)
        processes.push(processId)
        user_map.set(userId, processes)
      }
      else if (data.method === 'addProposal') {
        const proposalId = crypto.randomUUID()
        const process = JSON.parse(await db.get(processId))
        const proposal = {
          id: proposalId,
          title: '',
          description: '',
          createdAt: +new Date(),
        }
        process.proposals.push(proposal)
        await db.put(processId, JSON.stringify(process))

        users.forEach(user => {
          const rtn = {
            method: data.method,
            edit: userId === user.id,
            proposal
          }
          user.ws.send(JSON.stringify(rtn))
        });
        
      }
      else if (data.method === 'removeProposal') {
        const proposalId = data.proposalId
        const process = JSON.parse(await db.get(processId))
        process.proposals = process.proposals.filter(proposal => proposal.id !== proposalId)
        await db.put(processId, JSON.stringify(process))

        users.forEach(user => {
          const rtn = {
            method: data.method,
            proposalId
          }
          user.ws.send(JSON.stringify(rtn))
        });
      }
      else if (data.method === 'updateProposal') {
        const process = JSON.parse(await db.get(processId))
        const proposalId = data.proposalId

        const proposalIndex = process.proposals.findIndex((proposal) => proposal.id === proposalId)      
        const proposal = process.proposals[proposalIndex]
        proposal.title = data.title
        proposal.description = data.description
        await db.put(processId, JSON.stringify(process))

        users.forEach(user => {
          const rtn = {
            method: data.method,
            title: data.title,
            description: data.description,
            proposalId
          }
          user.ws.send(JSON.stringify(rtn))
        });
      }
    }
  });

  ws.on('close', function () {
    console.log('Closing connection')
    let processes = user_map.get(userId)
    user_map.delete(userId);
    processes.forEach(processId => {
      let users = process_map.get(processId)
      users.filter(user => user.id !== userId)
      process_map.set(processId, users)
      if (users.length === 0)
        process_map.delete(processId)
    })


  });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});