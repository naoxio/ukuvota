import type { APIRoute } from "astro";
import { parseProcessRawCookie } from '@utils/parseProcessCookie';

export const POST: APIRoute = async ({ request }) => {
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  processCookieObject.create = 'true';

  const headers = new Headers({
    'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json',
    'Location': request.headers.get('origin') as string + '/create'
  });

  return new Response(null, { status: 303, headers: headers });
};
