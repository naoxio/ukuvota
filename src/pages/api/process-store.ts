import type { APIRoute } from "astro";

import { parseProcessRawCookie } from '@utils/parseProcessCookie';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = Number(formData.get('step') || 1);
  const nextStep = step + 1;
  let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));
  processCookieObject.create = 'false';
  const referer = request.headers.get('referer') as string;
  if (step === 1) {
    try {
      Object.assign(processCookieObject, {
        step: nextStep,
        weighting: formData.get('weighting'),
        title: formData.get('topicQuestion'),
        nojsdescription: formData.get('nojsdescription'),
        quillopsdescription: formData.get('quillopsdescription'),
        phase: formData.get('phase')
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
    if (step === 2) {
      const phase = formData.get('phase');
  
      if (phase === 'full') {
        try {
          const startProposalDate = new Date(formData.get('start-date-picker-proposal') as string);
          const endProposalDate = new Date(formData.get('end-date-picker-proposal') as string);
          const startVotingDate = new Date(formData.get('start-date-picker-voting') as string);
          const endVotingDate = new Date(formData.get('end-date-picker-voting') as string);
          Object.assign(processCookieObject, {
            step: nextStep,
            startProposalDate: startProposalDate.getTime(),
            endProposalDate: endProposalDate.getTime(),
            startVotingDate: startVotingDate.getTime(),
            endVotingDate: endVotingDate.getTime()
          });
    
        const headers = new Headers({
          'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
          'Content-Type': 'application/json',
          'Location': referer
        });

        return new Response(null, { status: 303, headers: headers });
        } catch (error) {
          console.error("Error:", error);
          return new Response(null, { status: 303, headers: { 'Location': referer} });
        }
      } else if (phase === 'voting') {
        return new Response(null, { status: 303, headers: { 'Location': referer } });
      } else {
        return new Response(null, { status: 303, headers: { 'Location': referer } });
      }
    }
  }
  console.error("Invalid Step");

  return new Response(null, { status: 303, headers: { 'Location': referer } });

};
