import crypto from 'crypto';
import GUN from 'gun';

const gun = GUN();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
        const { title, description } = req.body;
        const proposalId = crypto.randomUUID();
        const processId = req.query.id;

        const proposal = {
            id: proposalId,
            title: title || '',
            description: description || '',
            createdAt: +new Date(),
        };

        gun.get(`process-${processId}`).get('proposals').get(proposalId).put(proposal, ack => {
            if (ack.err) {
                res.status(500).json({ error: `An unexpected error occurred. ${ack.err}` });
                return;
            }
            res.status(200).json(proposal);
        });
    } catch (error) {
        res.status(500).json({ error: `An unexpected error occurred. ${JSON.stringify(error)}` });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};

