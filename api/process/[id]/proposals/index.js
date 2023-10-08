import { getProcessFromDatabase, putProcessIntoDatabase } from '../../../lib/database';
import pusher from '../../../lib/pusher'; 

export default async (req, res) => {
  if (req.method === 'POST') {
      try {
          const process = await getProcessFromDatabase(req.query.id);
          const proposal = {
              id: crypto.randomUUID(),
              title: req.body.title || '',
              description: req.body.description || '',
              createdAt: +new Date(),
          };

          process.proposals.push(proposal);
          await putProcessIntoDatabase(process);

          // Trigger a pusher event
          pusher.trigger(`process-${req.query.id}`, 'proposal-added', proposal);

          res.status(200).json(proposal);
      } catch (error) {
          res.status(500).json({ error: 'An unexpected error occurred.' });
      }
  } else {
      res.status(405).end();  // Method Not Allowed
  }
};

