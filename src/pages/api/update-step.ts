import type { APIRoute } from "astro";
import { parseProcessRawCookie } from '@utils/parseProcessCookie';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = formData.get('step') as string;
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  processCookieObject.create = 'false';
  processCookieObject.step = step;

  if (step === '3' && processCookieObject.phase === 'voting') {
    const proposals = processCookieObject.proposals || [];
    if (proposals.length < 2) {
      const headers = new Headers({
        'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
        'Content-Type': 'application/json',
        'Location': request.headers.get('referer') as string,
      });
      return new Response('At least 2 proposals are required for the voting phase.', { status: 400, headers: headers });
    }
  }
  
  const headers = new Headers({
    'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
    'Content-Type': 'application/json',
    'Location': request.headers.get('referer') as string
  });
  return new Response(null, { status: 303, headers: headers });
};
