import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString } from 'firebase/storage';
import { firebaseDB } from '@utils/firebaseConfig';
import { zonedTimeToUtc } from 'date-fns-tz';

/* @ts-ignore*/
import { v4 as uuidv4 } from 'uuid';
import IProcess from '@interfaces/IProcess';

export const POST: APIRoute = async ({ request }) => {
  console.log("Received request to create process");

  const formData = await request.formData();
  console.log("Form data received");

  const descriptionContent = formData.get('descriptionContent') as string;
  console.log("Description content:", descriptionContent);

  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  console.log("Parsed cookie:", processCookieObject);

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
      console.log(`Uploading proposal description for proposal ID ${proposal.id}`);
      await uploadString(proposalDescriptionRef, proposal.description, 'raw');
    }
    return { id: proposal.id, title: proposal.title };
  }));

  const timezone = processCookieObject.timezone || 'UTC';
  
  const currentTimeUtc = zonedTimeToUtc(new Date(), timezone);

  let startProposalDate = processCookieObject.startProposalDate ? new Date(processCookieObject.startProposalDate) : currentTimeUtc;
  let endProposalDate = processCookieObject.endProposalDate ? new Date(processCookieObject.endProposalDate) : startProposalDate;

  startProposalDate = zonedTimeToUtc(startProposalDate, timezone);
  endProposalDate = zonedTimeToUtc(endProposalDate, timezone);

  if (startProposalDate.getTime() < currentTimeUtc.getTime()) {
    startProposalDate = currentTimeUtc;
  }

  if (endProposalDate.getTime() < startProposalDate.getTime()) {
    endProposalDate = new Date(startProposalDate.getTime() + 60000); // Add 1 minute to start proposal date
  }
  let startVotingDate = processCookieObject.startVotingDate ? new Date(processCookieObject.startVotingDate) : endProposalDate;
  let endVotingDate = processCookieObject.endVotingDate ? new Date(processCookieObject.endVotingDate) : new Date(startVotingDate.getTime() + 60000); // Default 1 minute after voting starts


  startVotingDate = zonedTimeToUtc(startVotingDate, timezone);
  endVotingDate = zonedTimeToUtc(endVotingDate, timezone);

  if (startVotingDate.getTime() < endProposalDate.getTime()) {
    startVotingDate = endProposalDate;
  }

  if (endVotingDate.getTime() < startVotingDate.getTime()) {
    endVotingDate = new Date(startVotingDate.getTime() + 60000); // Add 1 minute to start voting date
  }

  const processId = uuidv4();
  console.log("Generated new process ID:", processId);

  const reformattedProcess = {
    _id: processId,
    proposalDates: [startProposalDate.getTime(), endProposalDate.getTime()],
    proposals: proposalsMetadata,
    title: processCookieObject.title,
    votingDates: [startVotingDate.getTime(), endVotingDate.getTime()],
    weighting: processCookieObject.weighting,
    timezone: timezone,
  } as IProcess;

  if (descriptionContent) {
    reformattedProcess.descriptionId = descriptionId;
  }

  console.log("Reformatted process object:", reformattedProcess);

  await set(ref(firebaseDB, 'process/' + processId), reformattedProcess);
  console.log("Process saved to Firebase");

  const headers = new Headers({
    'Set-Cookie': `process=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    'Location': `/process/${processId}`,
  });

  console.log("Redirecting to newly created process page");

  return new Response(null, { status: 303, headers: headers });
};
