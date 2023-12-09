import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = Number(formData.get('step') || 1);
  const nextStep = step + 1;
  const processCookieRaw = request.headers.get('cookie');
  let processCookieObject = processCookieRaw ? JSON.parse(decodeURIComponent(processCookieRaw.split('; ').find(row => row.startsWith('process='))?.split('=')[1] || '{}')) : {};
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
    try {
      const now = new Date();

        let startDate = new Date(formData.get('startDate') as string);
        let endDate = new Date(formData.get('endDate') as string);

        if (isNaN(startDate.getTime()) || startDate < now) {
          startDate = new Date(now);
        }

        if (isNaN(endDate.getTime()) || endDate <= startDate) {
          endDate = new Date(startDate);
          endDate.setSeconds(endDate.getSeconds() + 1);
        }

      Object.assign(processCookieObject, {
        step: nextStep,
        startDate: startDate.getTime(),
        endDate: endDate.getTime()
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
  }
  console.error("Invalid Step");

  return new Response(null, { status: 303, headers: { 'Location': referer } });

};
