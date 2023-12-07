import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const step = formData.get('step');

  const processCookieRaw = request.headers.get('cookie');
  let processCookieObject = processCookieRaw ? JSON.parse(decodeURIComponent(processCookieRaw.split('; ').find(row => row.startsWith('process='))?.split('=')[1] || '{}')) : {};

  if (step === "1") {
    try {
      Object.assign(processCookieObject, {
        weighting: formData.get('weighting'),
        title: formData.get('topicQuestion'),
        nojsdescription: formData.get('nojsdescription'),
        quillopsdescription: formData.get('quillopsdescription')
      });

      const headers = new Headers({
        'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
        'Content-Type': 'application/json'
      });

      headers.append('Location', '/create/phases');
      return new Response(null, { status: 303, headers: headers });

    } catch (error) {
      console.error("Error:", error);
      return new Response(null, { status: 303, headers: { 'Location': '/create' } });
    }
  } else if (step === "2") {
    try {
      // Update only the necessary field for step 2
      processCookieObject.phase = formData.get('phase');

      const headers = new Headers({
        'Set-Cookie': `process=${encodeURIComponent(JSON.stringify(processCookieObject))}; Path=/; HttpOnly; SameSite=Strict`,
        'Content-Type': 'application/json'
      });

      let redirectPath = processCookieObject.phase === 'full' ? '/create/full-process' : '/create/voting-only';
      headers.append('Location', redirectPath);
      return new Response(null, { status: 303, headers: headers });

    } catch (error) {
      console.error("Error:", error);
      return new Response(null, { status: 303, headers: { 'Location': '/create' } });
    }
  }

  // If the step is neither "1" nor "2"
  return new Response(JSON.stringify({ message: "Invalid step" }), { status: 400 });
};
