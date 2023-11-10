export default async (req, res) => {
  if (req.method === 'POST') {
    const { step } = req.body;

    if (step === "1") {
      try {
        const { weighting, topicQuestion, description } = req.body;

        res.setHeader('Set-Cookie', [
          `weighting=${weighting}; Path=/; HttpOnly`,
          `title=${topicQuestion}; Path=/; HttpOnly`,
          `description=${description}; Path=/; HttpOnly`
        ]);
        
        res.writeHead(302, { Location: '/create/phases' });
        res.end();
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(302, { Location: '/create' });
        res.end();
      }
    } 
    else if (step === "2") {
      try {
        const { phase } = req.body;

        res.setHeader('Set-Cookie', `phases=${phase}; Path=/; HttpOnly`);

        let redirectPath = phase === 'full' ? '/create/full-process' : '/create/voting-only';
        res.writeHead(302, { Location: redirectPath });
        res.end();
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(302, { Location: '/create' });
        res.end();
      }
    }
  }
};
