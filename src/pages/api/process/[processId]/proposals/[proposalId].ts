import type { APIRoute } from 'astro';
import { ref, update, remove } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';

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
