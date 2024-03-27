import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, set } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';
/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';


export const POST: APIRoute = async ({ request }) => {
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));

  const processId = uuidv4();

  const processRef = ref(firebaseDB, `process/${processId}`);
  await set(processRef, processCookieObject);

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  return new Response(null, { status: 303, headers: headers });
};