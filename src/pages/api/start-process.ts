import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';
import { ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString } from 'firebase/storage';
import { firebaseDB } from '@utils/firebaseConfig';
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
    console.log("Uploading description content");
    await uploadString(descriptionRef, descriptionContent, 'raw');
  }

  const proposalsData = JSON.parse(formData.get('proposalsData') as string);
  console.log("Proposals data parsed:", proposalsData);

  const proposalsMetadata = await Promise.all(proposalsData.map(async (proposal: any) => {
    if (proposal.description && typeof proposal.description === 'string') {
      const proposalDescriptionRef = storageRef(storage, `proposals/${proposal.id}.json`);
      console.log(`Uploading proposal description for proposal ID ${proposal.id}`);
      await uploadString(proposalDescriptionRef, proposal.description, 'raw');
    }
    return { id: proposal.id, title: proposal.title };
  }));

  console.log("Proposals metadata:", proposalsMetadata);

  const timezone = processCookieObject.timezone || 'UTC';
  console.log("Timezone set to:", timezone);

  const currentTimestamp = new Date().getTime();
  console.log("Current timestamp:", currentTimestamp);

  let startProposalDate = processCookieObject.startProposalDate;
  let endProposalDate = processCookieObject.endProposalDate;

  // Validate and adjust proposal dates
  if (!startProposalDate || startProposalDate < currentTimestamp) {
    startProposalDate = currentTimestamp;
    console.log("Adjusted start proposal date:", startProposalDate);
  }

  if (!endProposalDate || endProposalDate < startProposalDate) {
    endProposalDate = startProposalDate;
    console.log("Adjusted end proposal date:", endProposalDate);
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

  console.log("Voting dates set to start at:", startVotingDate, "and end at:", endVotingDate);

  const processId = uuidv4();
  console.log("Generated new process ID:", processId);

  const reformattedProcess = {
    _id: processId,
    proposalDates: [startProposalDate, endProposalDate],
    proposals: proposalsMetadata,
    title: processCookieObject.title,
    votingDates: [startVotingDate, endVotingDate],
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
