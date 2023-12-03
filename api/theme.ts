// /api/theme.js
export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const newTheme = req.body.theme;

  res.setHeader('Set-Cookie', `theme=${newTheme}; Path=/; HttpOnly; SameSite=Strict`);

  res.redirect(req.headers.referer || '/');
}
