import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, set } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';
/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  const timezone = processCookieObject.timezone || 'UTC';

  // Get the current timestamp in the client's timezone
  const currentTimestamp = new Date().getTime();

  // Validate and adjust proposal dates
  let startProposalDate = processCookieObject.startProposalDate;
  let endProposalDate = processCookieObject.endProposalDate;

  if (!startProposalDate || startProposalDate < currentTimestamp) {
    startProposalDate = currentTimestamp;
  }

  if (!endProposalDate || endProposalDate < startProposalDate) {
    endProposalDate = startProposalDate;
  }

  // Validate and adjust voting dates
  let startVotingDate = processCookieObject.startVotingDate;
  let endVotingDate = processCookieObject.endVotingDate;

  if (!startVotingDate || startVotingDate < endProposalDate) {
    startVotingDate = endProposalDate;
  }

  if (!endVotingDate || endVotingDate < startVotingDate) {
    endVotingDate = startVotingDate + 60000; // Add 1 minute to the voting start date
  }

  const processId = uuidv4();
  const reformattedProcess = {
    _id: processId,
    description: {
      ops: processCookieObject.nojsdescription || processCookieObject.quillopsdescription
    },
    proposalDates: [startProposalDate, endProposalDate],
    proposals: processCookieObject.proposals ? processCookieObject.proposals.filter((proposal) => proposal !== undefined) : [],
    title: processCookieObject.title,
    votingDates: [startVotingDate, endVotingDate],
    weighting: processCookieObject.weighting,
    timezone: timezone,
  };

  set(ref(firebaseDB, 'process/' + processId), reformattedProcess);

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  return new Response(null, { status: 303, headers: headers });
};