import { exampleProposals } from '~/utils/exampleProposals.js';

import { parseProcessRawCookie } from '~/utils/parseProcessCookie';
import { IProposal } from "~/types";
import { utcToZonedTime } from 'date-fns-tz';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = Number(formData.get('step') || 1);
  const nextStep = step + 1;
  const timezone = formData.get('timezone') as string;

  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  processCookieObject.create = 'false';
  processCookieObject.timezone = timezone;

  const referer = request.headers.get('referer') as string;

  if (step === 1) {
    try {
      Object.assign(processCookieObject, {
        step: nextStep,
        weighting: formData.get('weighting'),
        title: formData.get('topicQuestion'),
        descriptionId: formData.get('descriptionId'),
        mode: formData.get('mode')
      });

      const headers = new Headers({
        'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
        'Content-Type': 'application/json',
        'Location': referer
      });
      return new Response(null, { status: 303, headers: headers });

    } catch (error) {
      console.error("Error:", error);
      return new Response(null, { status: 303, headers: { 'Location': '/create' } });
    }
  } else if (step === 2) {
    const mode = processCookieObject.mode;

    const currentDate = timezone ? utcToZonedTime(new Date(), timezone) : new Date();

    let startVotingDate = formData.get('start-date-picker-voting')
      ? Number(formData.get('start-date-picker-voting'))
      : processCookieObject.startVotingDate || currentDate.getTime();

    let endVotingDate = formData.get('end-date-picker-voting')
      ? Number(formData.get('end-date-picker-voting'))
      : processCookieObject.endVotingDate || (startVotingDate + 3600000);

    if (mode === 'full') {
      if (processCookieObject.proposals) processCookieObject.proposals = []

      const startProposalDate = formData.get('start-date-picker-proposal')
        ? Number(formData.get('start-date-picker-proposal'))
        : processCookieObject.startProposalDate || currentDate.getTime();

      let endProposalDate = formData.get('end-date-picker-proposal')
        ? Number(formData.get('end-date-picker-proposal'))
        : processCookieObject.endProposalDate || (startProposalDate + 3600000);

      if (endProposalDate <= startProposalDate) {
        endProposalDate = startProposalDate + 60000;
      }

      if (startVotingDate < endProposalDate) {
        startVotingDate = endProposalDate;
      }

      try {
        processCookieObject.startProposalDate = startProposalDate;
        processCookieObject.endProposalDate = endProposalDate;
        processCookieObject.startVotingDate = startVotingDate;
        processCookieObject.endVotingDate = endVotingDate;

        processCookieObject.step = nextStep.toString();

        const headers = new Headers({
          'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
          'Content-Type': 'application/json',
          'Location': referer
        });

        return new Response(null, { status: 303, headers: headers });
      } catch (error) {
        console.error("Error:", error);
        return new Response(null, { status: 303, headers: { 'Location': referer } });
      }
    } else {
      const proposals = JSON.parse(formData.get('proposals') as string|| '') as IProposal[] || processCookieObject.proposals || [];
      if (proposals.length < 2) {
        const headers = new Headers({
          'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
          'Location': request.headers.get('referer') as string,
        });
        return new Response('At least 2 proposals are required for the voting phase.', { status: 400, headers: headers });
      }

      if (endVotingDate <= startVotingDate) {
        endVotingDate = startVotingDate + 60000;
      }

      try {
        processCookieObject.startVotingDate = startVotingDate;
        processCookieObject.endVotingDate = endVotingDate;

        processCookieObject.step = nextStep.toString();
        processCookieObject.proposals = [];

        const proposalsData = formData.get('proposals');
        if (proposalsData) {
          const proposals = JSON.parse(proposalsData as string);

          processCookieObject.proposals = proposals || [];
        }
        
        const headers = new Headers({
          'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
          'Content-Type': 'application/json',
          'Location': referer
        });

        return new Response(null, { status: 303, headers: headers });
      } catch (error) {
        console.error("Error:", error);
        return new Response(null, { status: 303, headers: { 'Location': referer } });
      }
    }
  }
  console.error("Invalid Step");

  return new Response(null, { status: 303, headers: { 'Location': referer } });
};