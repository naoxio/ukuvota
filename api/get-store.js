export default async (req, res) => {
  if (req.method === 'GET') {
    try {
        const process = {
            resistance: req.cookies.resistance === 'on',
            weighting: req.cookies.weighting,
            title: req.cookies.title,
            description: req.cookies.description
        };
        res.status(200).json(process);
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  } else if (req.method === 'POST') {
    const { resistance, weighting, title, description } = req.body;
    res.cookie('resistance', resistance);
    res.cookie('weighting', weighting);
    res.cookie('title', title);
    res.cookie('description', description);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};
