export default async (req, res) => {
  if (req.method === 'POST') {
    const { step } = req.body;

    // Handle step 1
    if (step === "1") {
      try {
        const { weighting, topicQuestion, description } = req.body;

        // Set cookies using headers for step 1
        res.setHeader('Set-Cookie', [
          `weighting=${weighting}; Path=/; HttpOnly`,
          `title=${topicQuestion}; Path=/; HttpOnly`,
          `description=${description}; Path=/; HttpOnly`
        ]);
        
        // Redirect to the /create/phases for step 1
        res.writeHead(302, { Location: '/create/phases' });
        res.end();

      } catch (error) {
        console.error("Error:", error);
        // Redirect back to /create if step 1 processing fails
        res.writeHead(302, { Location: '/create' });
        res.end();
      }
    } 

    // Handle other steps here with additional if or switch-case conditions...
    // For instance:
    // if (step === "2") {
    //   const { someOtherData } = req.body;
    //   // Set cookies or handle data for step 2
    //   // Decide on redirection for step 2
    // }

  }
};
