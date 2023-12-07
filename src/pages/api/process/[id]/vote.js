// api/process/[id]/vote.js
import crypto from 'crypto';
import { getProcessFromDatabase, putProcessIntoDatabase } from '../../../src/lib/database.js';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const process = await getProcessFromDatabase(req.query.id);
            const body = req.body;

            if (Array.isArray(body.votes)) {
                const votes = body.votes.map(vote => ({ 
                    proposalId: vote.proposalId, 
                    vote: vote.vote 
                }));
                
                if (typeof body.name === 'string') {
                    const vote = {
                        id: crypto.randomUUID(),
                        name: body.name,
                        votes
                    };
                    
                    if (!process.voters) {
                        process.voters = [];
                    }
                    
                    process.voters.push(vote);
                    await putProcessIntoDatabase(process);
                    res.status(200).end();
                } else {
                    res.status(400).send('Invalid name property');
                }
            } else {
                res.status(400).send('Invalid votes property');
            }
        } catch (error) {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
};
