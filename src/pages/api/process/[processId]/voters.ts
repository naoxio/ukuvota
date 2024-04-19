/*
export default async (req, res) => {
  if (req.method === 'GET') {
      try {
          const process = await getProcessFromDatabase(req.query.id);
          res.status(200).json(process.voters || []);
      } catch (error) {
          res.status(500).json({ error: 'An unexpected error occurred.' });
      }
  } else {
      res.status(405).end();  // Method Not Allowed
  }
};
*/