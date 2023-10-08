import { getProcessFromDatabase, putProcessIntoDatabase } from '../../../../lib/database.js';
import pusher from '../../../../lib/pusher.js'; 

export default async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const process = await getProcessFromDatabase(req.query.id);
            const { proposalId, title, description } = req.body;
            
            const proposal = process.proposals.find(p => p.id === proposalId);
            if (!proposal) {
                res.status(404).json({ error: 'Proposal not found.' });
                return;
            }

            proposal.title = title;
            proposal.description = description;

            await putProcessIntoDatabase(process);

            // Trigger a pusher event
            pusher.trigger(`process-${req.query.id}`, 'proposal-updated', {
                proposalId,
                title,
                description
            });

            res.status(200).json(proposal);
        } catch (error) {
            res.status(500).json({ error: `An unexpected error occurred. ${JSON.stringify(error)}`  });
        }
    } else if (req.method === 'DELETE') {
      try {
            const process = await getProcessFromDatabase(req.query.id);
            console.log('Fetched Process:', process);

            const proposalId = req.query.proposalId;
            console.log(proposalId)

            const proposalIndex = process.proposals.findIndex(p => p.id === proposalId);
            if (proposalIndex === -1) {
                res.status(404).json({ error: 'Proposal not found.' });
                return;
            }

            process.proposals.splice(proposalIndex, 1);  // Remove the proposal
            await putProcessIntoDatabase(process);

            // Trigger a pusher event for deletion. You might want to create a new event type for this.
            pusher.trigger(`process-${req.query.id}`, 'proposal-deleted', {
                proposalId
            });

            res.status(200).json({ message: 'Proposal successfully deleted.' });
      } catch (error) {
            res.status(500).json({ error: `An unexpected error occurred. ${JSON.stringify(error)}`  });
      }
  } else {
      res.status(405).end();  // Method Not Allowed
  }
};
