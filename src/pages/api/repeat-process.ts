import type { APIRoute } from 'astro';
import { parseProcessRawCookie } from '@utils/parseProcessCookie';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const selectedProposals = formData.getAll('selectedProposals[]') as string[];
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const weighting = formData.get('weighting') as string;
  const proposals = JSON.parse(formData.get('proposals') as string);

  if (selectedProposals.length > 1) {
    let processCookieObject = parseProcessRawCookie(request.headers.get('cookie'));

    processCookieObject.title = title;
    processCookieObject.descriptionId = description;
    processCookieObject.weighting = weighting;
    processCookieObject.phase = 'voting';
    processCookieObject.proposals = proposals.filter((proposal: any) =>
      selectedProposals.includes(proposal.id)
    );
    processCookieObject.create = 'true';

    const headers = new Headers({
      'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
      'Location': '/create',
    });

    return new Response(null, { status: 303, headers: headers });
  } else {
    return new Response(null, { status: 400 });
  }
};