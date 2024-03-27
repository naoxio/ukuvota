import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, push } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';
/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));

  const reformattedProcess = {
    description: { ops: processCookieObject.nojsdescription || processCookieObject.quillopsdescription },
    proposalDates: [processCookieObject.startVotingDate, processCookieObject.endVotingDate],
    proposals: processCookieObject.proposals,
    title: processCookieObject.title,
    votingDates: [processCookieObject.startVotingDate, processCookieObject.endVotingDate],
    weighting: processCookieObject.weighting,
  };

  const processId = uuidv4();
  const newProcessRef = push(ref(firebaseDB, 'process/' + processId), reformattedProcess);

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  return new Response(null, { status: 303, headers: headers });
};