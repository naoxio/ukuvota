import type { APIRoute } from 'astro';
import { ref, onValue, update, remove, off } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';

export const GET: APIRoute = ({ params, request }) => {
  const { processId } = params;
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',  
  });


  const proposalsRef = ref(firebaseDB, `process/${processId}/proposals`);

  const stream = new ReadableStream({
    start(controller) {
      const listener = onValue(proposalsRef, (snapshot) => {
        if (snapshot.exists()) {
          const proposals = snapshot.val();
          const data = `data: ${JSON.stringify(proposals)}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
        }
      });

      return () => {
        off(proposalsRef, 'value', listener);
      };
    },
  });

  return new Response(stream, { headers });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { processId } = params;
  const body = await request.json();
  const { id, title, description } = body;

  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${id}`);
  
  const updateData: any = {};
  if (title !== null && title !== undefined) {
    updateData.title = title;
  }
  if (description !== null && description !== undefined) {
    updateData.description = description;
  }

  if (Object.keys(updateData).length > 0) {
    await update(proposalRef, updateData);
  }

  return new Response(null, { status: 200 });
};


export const DELETE: APIRoute = async ({ params, request }) => {
  const { processId } = params;
  const { id } = await request.json();

  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${id}`);
  await remove(proposalRef);

  return new Response(null, { status: 200 });
};