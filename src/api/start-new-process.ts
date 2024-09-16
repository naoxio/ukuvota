import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json',
    'Location': request.headers.get('referer') as string
  });
  return new Response(null, { status: 303, headers: headers });
};
