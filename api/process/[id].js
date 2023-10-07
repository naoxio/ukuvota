import { getProcessFromDatabase } from '../database';

export default async function(req, res) {
   const processId = req.query.id;
   console.log(processId)
   try {
      const process = await getProcessFromDatabase(processId);
      
      if (req.method === 'GET' && req.url.includes('/voters')) {
         res.json(process.voters);
      } else {
         res.send({ process });
 ;     }
   } catch (error) {
      if (error.message === 'Process not found') {
         res.status(404).json({ error: 'Process not found.' });
      } else {
         res.status(500).json({ error: 'An unexpected error occurred.' });
      }
   }
}