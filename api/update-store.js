export default async (req, res) => {
  console.log(req)
  if (req.method === 'POST') {
    try {
      const { resistance, weighting, title, description } = req.body;

      res.cookie('resistance', resistance === 'on' ? 'true' : 'false'); 
      res.cookie('weighting', weighting);
      res.cookie('title', title);
      res.cookie('description', description);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing the data.' });
    }
  } else {
    res.status(405).end();
  }
};
