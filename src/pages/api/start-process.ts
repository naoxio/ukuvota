import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, push } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';
/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const POST: APIRoute = async ({ request }) => {
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  const clientTimezone = processCookieObject.clientTimezone || 'UTC';

  // Get the current timestamp in UTC
  const currentTimestamp = Date.now();

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
    proposals: processCookieObject.proposals,
    title: processCookieObject.title,
    votingDates: [startVotingDate, endVotingDate],
    weighting: processCookieObject.weighting,
    clientTimezone: clientTimezone,
  };

  push(ref(firebaseDB, 'process/' + processId), reformattedProcess);

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  return new Response(null, { status: 303, headers: headers });
};