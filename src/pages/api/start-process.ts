import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString } from 'firebase/storage';
import { firebaseDB } from '@utils/firebaseConfig';
import { prettyFormatInTimezone } from '@utils/dateUtils';

/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';
import IProcess from '@interfaces/IProcess';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const descriptionContent = formData.get('descriptionContent') as string;
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  const descriptionId = processCookieObject.descriptionId;

  const storage = getStorage();

  if (descriptionId && descriptionContent) {
    const descriptionRef = storageRef(storage, `descriptions/${descriptionId}.json`);
    await uploadString(descriptionRef, descriptionContent, 'raw');
  }

  const proposalsData = JSON.parse(formData.get('proposalsData') as string);
  const proposalsMetadata = await Promise.all(proposalsData.map(async (proposal: any) => {
    if (proposal.description && typeof proposal.description === 'string') {
      const proposalDescriptionRef = storageRef(storage, `proposals/${proposal.id}.json`);
      await uploadString(proposalDescriptionRef, proposal.description, 'raw');
    }
    return { id: proposal.id, title: proposal.title };
  }));

  const timezone = processCookieObject.timezone || 'UTC';
  const currentTimestamp = new Date().getTime();
  let startProposalDate = processCookieObject.startProposalDate as number;
  let endProposalDate = processCookieObject.endProposalDate as number;
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
    proposalDates: [startProposalDate, endProposalDate],
    proposals: proposalsMetadata,
    title: processCookieObject.title || '',
    votingDates: [startVotingDate, endVotingDate],
    weighting: processCookieObject.weighting || '1',
    timezone: timezone,
  } as IProcess;

  if (descriptionContent) {
    reformattedProcess.descriptionId = descriptionId || '';
  }


  set(ref(firebaseDB, 'process/' + processId), reformattedProcess);

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  return new Response(null, { status: 303, headers: headers });
};