const dateChanger = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  try {
    const { phase, index, date } = req.body;
    res.setHeader("Set-Cookie", `${phase}Date${index}=${date}; Path=/; HttpOnly`);
    res.writeHead(302, { Location: "/some-redirect-path" });
    res.end();
  } catch (error) {
    console.error("Error processing date change:", error);
    res.writeHead(302, { Location: "/error-page" });
    res.end();
  }
};

export { dateChanger as default };
