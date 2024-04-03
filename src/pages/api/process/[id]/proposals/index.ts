import type { APIRoute } from 'astro';
import { ref, onValue, push, update, remove, off } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';

export const GET: APIRoute = ({ params, request }) => {
  const { processId } = params;

  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const proposalsRef = ref(firebaseDB, `process/${processId}/proposals`);

  const stream = new ReadableStream({
    start(controller) {
      onValue(proposalsRef, (snapshot) => {
        const proposals = snapshot.val();
        const data = `data: ${JSON.stringify(proposals)}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      });
    },
    cancel() {
      off(proposalsRef);
    },
  });

  return new Response(stream, { headers });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { processId } = params;
  const { id, title, description } = await request.json();

  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${id}`);
  await update(proposalRef, { title, description });

  return new Response(null, { status: 200 });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { processId } = params;
  const { id } = await request.json();

  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${id}`);
  await remove(proposalRef);

  return new Response(null, { status: 200 });
};