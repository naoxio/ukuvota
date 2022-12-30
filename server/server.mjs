import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import db from './db.mjs'
import { WebSocketServer } from 'ws';

const getTimestamp = (minutes, hours, days) => {
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
  const process = JSON.parse(await db.get(processId));
  const body = req.body

  const votes = body.votes.map(vote => ({
    proposalId: vote.proposalId,
    vote: vote.vote,
  }));

  const vote = {
    name: body.name,
    votes
  }
  
  process.voters = process.voters || [];
  process.voters.push(vote);

  await db.put(processId, JSON.stringify(process))
  res.json({})
});

app.post('/api/quick/process', async(req, res) => {
  const body = req.body
  const uuid = crypto.randomUUID()
  const proposalEnd = +new Date() + getTimestamp(body.proposalMinutes, body.proposalHours, body.proposalDays)
  const votingEnd = proposalEnd + getTimestamp(body.votingMinutes, body.votingHours, body.votingDays)
  const proposals = body.proposals
    ? body.proposals.map(proposal => ({
        id: crypto.randomUUID(),
        title: proposal.title,
        description: proposal.description,
        createdAt: +new Date(),
      }))
    : [];

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

const sendToAllUsers = (users, message) => {
  users.forEach(user => {
    user.ws.send(JSON.stringify(message));
  });
};

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
      switch (data.method) {
        case 'setProcess': {
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
          break;
        }
        case 'addProposal': {
          const proposalId = crypto.randomUUID()
          const process = JSON.parse(await db.get(processId))
          const proposal = {
            id: proposalId,
            title: '',
            description: '',
            createdAt: +new Date(),
          }
          process.proposals.push(proposal)
          const updates = [
            db.put(processId, JSON.stringify(process)),
            sendToAllUsers(
              users,
              {
                method: data.method,
                edit: userId === user.id,
                proposal,
              }
            ),
          ];
          await Promise.all(updates); 
          break;
        }
        case 'removeProposal': {
          const proposalId = data.proposalId
          const process = JSON.parse(await db.get(processId))
          process.proposals = process.proposals.filter(
            proposal => proposal.id !== proposalId
          );
          
          const updates = [
            db.put(processId, JSON.stringify(process)),
            sendToAllUsers(users, {
              method: data.method,
              proposalId,
            }),
          ];
          await Promise.all(updates);
          break;
        }
        case 'updateProposal': {
          const process = JSON.parse(await db.get(processId))
          const proposalId = data.proposalId

          const proposalIndex = process.proposals.findIndex(
            proposal => proposal.id === proposalId
          );
          const proposal = process.proposals[proposalIndex]
          proposal.title = data.title
          proposal.description = data.description

          const updates = [
            db.put(processId, JSON.stringify(process)),
            sendToAllUsers(
              users,
              {
                method: data.method,
                title: data.title,
                description: data.description,
                proposalId,
              }
            ),
          ];
          await Promise.all(updates);
          break;
        }
      }
    }
  });

  ws.on('close', function () {
    console.log('Closing connection')
    let processes = user_map.get(userId)
    user_map.delete(userId);
    processes.forEach(processId => {
      let users = process_map.get(processId)
      process_map.set(processId, users.filter(user => user.id !== userId));
      if (users.length === 0)
        process_map.delete(processId)
    })
  });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});