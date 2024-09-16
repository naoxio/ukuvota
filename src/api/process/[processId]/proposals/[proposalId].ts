import type { APIRoute } from 'astro';
import { ref, update, remove, onValue,off } from 'firebase/database';
import { firebaseDB } from '~/utils/firebaseConfig';


export const GET: APIRoute = async ({ params, request }) => {
  const { processId, proposalId } = params;
  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${proposalId}`);

  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = (snapshot: any) => {
        if (snapshot.exists()) {
          const data = JSON.stringify(snapshot.val());
          controller.enqueue(`data: ${data}\n\n`);
        }
      };

      const errorCallback = (error: any) => {
        controller.error(`Event stream failed: ${error}`);
        controller.close();
      };

      onValue(proposalRef, sendUpdate, errorCallback);

      return () => {
        off(proposalRef, 'value', sendUpdate);
        controller.close();
      };
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { processId, proposalId } = params;
  const { title, description } = await request.json();
  
  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${proposalId}`);
  try {
    await update(proposalRef, { title, description });
    return new Response(JSON.stringify({ title, description }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `An unexpected error occurred. ${error.message}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { processId, proposalId } = params;

  const proposalRef = ref(firebaseDB, `process/${processId}/proposals/${proposalId}`);
  try {
    await remove(proposalRef);
    return new Response(JSON.stringify({ message: 'Proposal successfully deleted.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `An unexpected error occurred. ${error.message}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
