import { getProcessFromDatabase, putProcessIntoDatabase } from 'src/lib/database.js';
import GUN from 'gun';

const gun = GUN();

export default async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const { title, description } = req.body;
            const proposalId = req.query.proposalId;
            const processId = req.query.id;
    
            gun.get(`process-${processId}`).get('proposals').get(proposalId).put({ title, description }, ack => {
                if (ack.err) {
                    res.status(500).json({ error: `An unexpected error occurred. ${ack.err}` });
                    return;
                }
                res.status(200).json({ title, description });
            });
        } catch (error) {
            res.status(500).json({ error: `An unexpected error occurred. ${JSON.stringify(error)}` });
        }    
    } else if (req.method === 'DELETE') {
        try {
            const proposalId = req.query.proposalId;
            const processId = req.query.id;
    
            gun.get(`process-${processId}`).get('proposals').get(proposalId).put(null, ack => {
                if (ack.err) {
                    res.status(500).json({ error: `An unexpected error occurred. ${ack.err}` });
                    return;
                }
                res.status(200).json({ message: 'Proposal successfully deleted.' });
            });
        } catch (error) {
            res.status(500).json({ error: `An unexpected error occurred. ${JSON.stringify(error)}` });
        }   
    } else {
        res.status(405).end();  // Method Not Allowed
    }
};
