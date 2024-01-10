import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const newLanguagePath = formData.get('lang') as string;
  console.log(newLanguagePath)
  const headers = new Headers({
    'Location': newLanguagePath,
    'Content-Type': 'application/json'
  });

  return new Response(null, {
    status: 303, // 303 See Other
    headers: headers,
  });
};
