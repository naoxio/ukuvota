// /api/theme.js
export default function(req, res) {
  const newTheme = req.body.theme;

  res.setHeader('Set-Cookie', `theme=${newTheme}; Path=/; HttpOnly; SameSite=Strict`);

  res.redirect(req.headers.referer || '/');
}
