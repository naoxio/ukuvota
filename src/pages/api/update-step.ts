import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = formData.get('step');

  let processCookie = request.headers.get('cookie');
  let processCookieObject = processCookie ? JSON.parse(decodeURIComponent(processCookie.split('; ').find(row => row.startsWith('process='))?.split('=')[1] || '{}')) : {};

  processCookieObject.step = step;
  const headers = new Headers({
    'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json',
    'Location': request.headers.get('referer') as string
  });
  return new Response(null, { status: 303, headers: headers });
};
