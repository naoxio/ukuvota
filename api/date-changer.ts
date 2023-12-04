export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const { phase, index, date } = req.body;

    res.setHeader('Set-Cookie', `${phase}Date${index}=${date}; Path=/; HttpOnly`);

    res.writeHead(302, { Location: '/some-redirect-path' });
    res.end();
  } catch (error) {
    console.error("Error processing date change:", error);
    res.writeHead(302, { Location: '/error-page' });
    res.end();
  }

};
