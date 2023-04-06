// import required modules
import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import db from './db.mjs'
import { WebSocketServer } from 'ws';


const port = process.env.PORT ? process.env.PORT : 3600
const app = express();
const process_map = new Map();
const user_map = new Map();

app.use(express.static('dist/client/'));
app.use(ssrHandler);
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb'}));

const MAX_PAYLOAD_SIZE = 2 * 1024 * 1024; // 2mb in bytes


// Add the getAll route
app.get('/api/getAll', async (req, res) => {
  const data = [];

  const iterator = db.iterator();

  function processEntry() {
    iterator.next((err, key, value) => {
      if (err) {
        console.error('Error while reading from LevelDB:', err);
        res.status(500).send('Error while reading from LevelDB');
        return;
      }

      if (!key && !value) {
        res.json(data);
        return;
      }

      data.push({ key: key.toString(), value: JSON.parse(value.toString()) });
      processEntry();
    });
  }

  processEntry();
});

app.get('/api/process/:id', async (req, res) => {
  const processId = req.params.id;
  const process = await db.get(processId);

  if (!process) {
    res.status(404).json({ error: 'Process not found.' });
  } else {
    res.json({ process });
  }
});

app.get('/api/process/:id/voters', async (req, res) => {
  const processId = req.params.id;
  const process = JSON.parse(await db.get(processId));

  if (!process) {
    res.status(404).json({ error: 'Process not found.' });
  } else {
    res.json(process.voters);
  }
});


app.post('/api/process/:id/vote', async(req, res) => {
  // Get the process ID from the URL parameters
  const processId = req.params.id;
  // Get the process object from the database
  const process = JSON.parse(await db.get(processId));
  // Get the request body
  const body = req.body;

  // Check that the 'votes' property of the body is an array
  if (typeof body.votes === 'object' && body.votes instanceof Array) {
    // Create an array of votes
    const votes = body.votes
      .map(vote => ({ proposalId: vote.proposalId, vote: vote.vote }))
  
    // Check that the 'name' property of the body is a string
    if (typeof body.name === 'string') {
      // Create a new vote object
      const vote = {
        id: crypto.randomUUID(),
        name: body.name,
        votes
      };

      // Initialize the 'voters' property of the process object if it doesn't exist
      if (!process.voters) {
        process.voters = [];
      }
      // Add the new vote to the process object
      process.voters.push(vote);

      // Save the updated process object to the database
      await db.put(processId, JSON.stringify(process));
      // Send a successful response
      res.json({});
    } else {
      // Handle invalid 'name' property
      res.status(400).send('Invalid name property');
    }
  } else {
    // Handle invalid 'votes' property
    res.status(400).send('Invalid votes property');
  }
});

const updateDates = (dates) => {
  if (dates === -1) return [-1, -1];

  let duration = dates[1] - dates[0];
  duration = Math.max(duration, 60000);
  
  if (dates[0] < +new Date()) {
    dates[0] = +new Date();
  }

  dates[1] = dates[0] + duration;

  return dates;
}

app.post('/api/process', async(req, res) => {
  const contentLength = parseInt(req.headers['content-length']);
  if (contentLength > MAX_PAYLOAD_SIZE) {
    res.status(413).send('Payload too large');
    return;
  }

  // Get the request body
  const body = req.body;

  // Check that the 'topicQuestion' and 'topicDescription' properties of the body are strings
  if (typeof body.topicQuestion === 'string' && (typeof body.topicDescription === 'object' || typeof body.topicDescription === 'string')) {
    // Generate a unique ID for the process
    const uuid = crypto.randomUUID();

    // Check that the 'proposals' property of the body is an array
    if (typeof body.proposals === 'object' && body.proposals instanceof Array) {
      // Create an array of proposal objects from the body
      const proposals = body.proposals.map(proposal => ({
        id: crypto.randomUUID(),
        title: proposal.title,
        description: proposal.description,
        createdAt: +new Date(),
      }));

      // Create the process object
      const process = {
        title: body.topicQuestion,
        description: body.topicDescription,
        proposalDates: updateDates(body.proposalDates),
        votingDates: updateDates(body.votingDates),
        weighting: body.weighting,
        proposals,
      };
      // Save the process object to the database
      await db.put(uuid, JSON.stringify(process));
      // Send the process ID in the response
      res.json({ id: uuid });
    } else {
      // Handle invalid 'proposals' property
      res.status(400).send('Invalid proposals property');
    }
  } else {
    // Handle invalid 'topicQuestion' or 'topicDescription' property
    res.status(400).send('Invalid topicQuestion or topicDescription property');
  }
});

// Function to send a message to all users in a given array
const sendToAllUsers = (users, message) => {
  // Iterate over each user in the array
  users.forEach(user => {
    // Send the message to the user's websocket
    user.ws.send(JSON.stringify(message));
  });
};

const server = http.createServer(app);
// Create a WebSocket server
const wss = new WebSocketServer({ server });




// Handle a new WebSocket connection
wss.on('connection', async (ws, req) => {
  // Generate a unique ID for the user
  const userId = crypto.randomUUID();
  // Initialize the user's list of processes
  user_map.set(userId, []);
  // Handle incoming messages from the user
  ws.on('message', async(message) => {
    if (message.binary && message.binary.length > MAX_PAYLOAD_SIZE) {
      const errorMessage = JSON.stringify({ error: 'Payload too large' });
    ws.send(errorMessage);
      return;
    }
      
    // Parse the message data
    let data = JSON.parse(message);
    // Get the ID of the process
    const processId = data.processId;
    // Get the list of users for the process
    const users = process_map.get(processId) || [];
    
    // Check if the message includes a 'method' property
    if ('method' in data) {
      // Handle the message based on the 'method' value
      switch (data.method) {
        case 'setProcess': {
          // Add the user to the list of users for the process
          users.push({
            id: userId,
            ws
          });
          // Update the map of users for the process
          process_map.set(processId, users);
        
          // Get the list of processes for the user
          let processes = user_map.get(userId);
          // Add the process to the list of processes for the user
          processes.push(processId);
          // Update the map of processes for the user
          user_map.set(userId, processes);
          break;
        }        
        case 'addProposal': {
          // Generate a unique ID for the new proposal
          const proposalId = crypto.randomUUID();
          // Get the process object from the database
          const process = JSON.parse(await db.get(processId));
          // Create the new proposal object
          const proposal = {
            id: proposalId,
            title: data.title ? data.title : '',
            description: data.description ? data.description : '',
            createdAt: +new Date(),
          };
          // Add the new proposal to the process
          process.proposals.push(proposal);
          // Array of updates to be performed
          const updates = [
            // Save the updated process object to the database
            db.put(processId, JSON.stringify(process)),
            // Send a message to all users to update their proposals list
            users.forEach(user => {
              user.ws.send(JSON.stringify({
                method: data.method,
                // Include the 'edit' property if the user is the one who added the proposal
                edit: userId === user.id,
                proposal,
              }));
            }),
          ];
          // Perform all updates
          await Promise.all(updates); 
          break;
        }        
        case 'removeProposal': {
          // Get the ID of the proposal to remove
          const proposalId = data.proposalId;
          // Get the process data from the database
          const process = JSON.parse(await db.get(processId));
          // Filter out the proposal with the specified ID from the list of proposals
          process.proposals = process.proposals.filter(
            proposal => proposal.id !== proposalId
          );
          
          // Perform updates to the database and send messages to all users
          const updates = [
            db.put(processId, JSON.stringify(process)),
            sendToAllUsers(users, {
              method: data.method,
              proposalId,
            }),
          ];
          // Wait for all updates to complete
          await Promise.all(updates);
          break;
        }
        case 'updateProposal': {
          // Get the process data from the database
          const process = JSON.parse(await db.get(processId));
          // Get the ID of the proposal to update
          const proposalId = data.proposalId;
          // Find the index of the proposal with the specified ID in the process' list of proposals
          const proposalIndex = process.proposals.findIndex(
            proposal => proposal.id === proposalId
          );
          // Get the proposal object at the found index
          const proposal = process.proposals[proposalIndex];
          // Update the title and description of the proposal
          proposal.title = data.title;
          proposal.description = data.description;
        
          // Perform updates to the database and send messages to all other users, except for the one making the update
          const filteredUsers = users.filter(user => user.id !== userId);

          const updates = [
            db.put(processId, JSON.stringify(process)),
            sendToAllUsers(
              filteredUsers,
              {
                method: data.method,
                title: data.title,
                description: data.description,
                proposalId,
              }
            ),
          ];
          // Wait for all updates to complete
          await Promise.all(updates);
          break;
        }
      }        
    }
  });

  // When the WebSocket connection is closed
  ws.on('close', function () {
    // Get all processes associated with the user
    let processes = user_map.get(userId)
    // Remove the user from the user map
    user_map.delete(userId);
    // Iterate through all processes the user is a part of
    processes.forEach(processId => {
      // Get all users in the process
      let users = process_map.get(processId)
      // Remove the user from the process
      process_map.set(processId, users.filter(user => user.id !== userId));
      // If there are no more users in the process, remove the process from the process map
      if (users.length === 0)
        process_map.delete(processId)
    })
  });
});

server.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
