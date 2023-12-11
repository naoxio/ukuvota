import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  let processCookie = request.headers.get('cookie');
  let processCookieObject = processCookie ? JSON.parse(decodeURIComponent(processCookie.split('; ').find(row => row.startsWith('process='))?.split('=')[1] || '{}')) : {};
  processCookieObject.new = true;
  console.log(request.headers)
  const headers = new Headers({
    'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json',
    'Location': request.headers.get('referer') as string
  });
  return new Response(null, { status: 303, headers: headers });
};
