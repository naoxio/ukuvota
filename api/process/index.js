import { putProcessIntoDatabase, getProcessFromDatabase } from '../../src/lib/database.js';
import crypto from 'crypto';

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

export default async function(req, res) {
    // Handle GET request
    if (req.method === 'GET') {
        try {
            const process = await getProcessFromDatabase(req.query.id);
            res.json(process);
        } catch (error) {
            if (error.message === 'Process not found') {
                res.status(404).json({ error: 'Process not found.' });
            } else {
                console.log(error)
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }
    
    // Handle POST request
    else if (req.method === 'POST') {
        const body = req.body;

        // Validations and process creation logic
        if (typeof body.topicQuestion !== 'string' || 
            (typeof body.topicDescription !== 'object' && 
             typeof body.topicDescription !== 'string')) {
            res.status(400).send('Invalid topicQuestion or topicDescription property');
            return;
        }

        if (!Array.isArray(body.proposals)) {
            res.status(400).send('Invalid proposals property');
            return;
        }

        const uuid = crypto.randomUUID();

        const proposals = body.proposals.map(proposal => ({
            id: crypto.randomUUID(),
            title: proposal.title,
            description: proposal.description,
            createdAt: +new Date(),
        }));

        const process = {
            _id: uuid,
            title: body.topicQuestion,
            description: body.topicDescription,
            proposalDates: updateDates(body.proposalDates),
            votingDates: updateDates(body.votingDates),
            weighting: body.weighting,
            proposals,
        };

        try {
            await putProcessIntoDatabase(process);
            res.json({ id: uuid });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to save process.' });
        }
    }

    // Other HTTP methods not supported
    else {
        res.status(405).send('Method not allowed.');
    }
}
