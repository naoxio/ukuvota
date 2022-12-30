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

app.use(express.static('dist/client/'));
app.use(ssrHandler);
app.use(express.json())

app.get('/api/quick/process/:processId/proposal', async(req, res)  => {
  const processId = req.params.processId
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
  res.json({proposal})
})
app.get('/api/quick/process/:processId/proposal/:proposalId/delete', async(req, res) => {
  const processId = req.params.processId
  const process = JSON.parse(await db.get(processId))
  process.proposals = process.proposals.filter(proposal => proposal.id !== req.params.proposalId)
  await db.put(processId, JSON.stringify(process))
  res.json({})
})
app.post('/api/quick/process/:processId/proposal/:proposalId', async(req, res) => {
  const processId = req.params.processId
  const body = req.body
  const process = JSON.parse(await db.get(processId))
  const proposalIndex = process.proposals.findIndex((proposal) => proposal.id === req.params.proposalId)
  if (proposalIndex === -1) return { status: '-1'}

  const proposal = process.proposals[proposalIndex]
  proposal.title = body.title
  proposal.description = body.description
  await db.put(processId, JSON.stringify(process))
  res.json({})
});

app.get('/api/quick/process/:id', async(req, res) => {
  const process = await db.get(req.params.id)
  res.json({ process })
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


wss.on('connection', function (ws, request) {
  ws.on('message', function (message) {
    //
    // Here we can now use session parameters.
    //
    console.log(`Received message ${message}`);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.on('close', function () {
    console.log('Closing connection')
  });
  ws.send('Hi there, I am a WebSocket server');
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});