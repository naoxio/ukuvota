import type { APIRoute } from "astro"

export const POST: APIRoute = async({ request, redirect }) => {
  const formData = await request.formData();
  const theme = formData.get('theme');
  const headers = new Headers({
    'Set-Cookie': `theme=${theme}; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json'
  });

  const referrer = request.headers.get('referer') || '/';
  headers.append('Location', referrer);

  return new Response(null, {
    status: 303, // 303 See Other
    headers: headers,
  });
};

