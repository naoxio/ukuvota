import type { APIRoute } from 'astro';
import { ref, update, get } from 'firebase/database';
import { firebaseDB } from '~/utils/firebaseConfig';
/* @ts-ignore */
import { v4 as uuidv4 } from 'uuid';
import IProposal from '~/interfaces/IProposal';

export const POST: APIRoute = async ({ request }) => {
  const referer = request.headers.get('Referer');

  if (!referer) {
    return new Response(JSON.stringify({ error: 'Missing referer header' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const url = new URL(referer);
  const processId = url.pathname.split('/')[2];

  if (!processId) {
    return new Response(JSON.stringify({ error: 'Missing process ID' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const processRef = ref(firebaseDB, 'process/' + processId);

    // Get the existing process data
    const processSnapshot = await get(processRef);
    const process = processSnapshot.val();

    if (!process) {
      return new Response(JSON.stringify({ error: 'Process not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { name, votes } = await request.json();

    if (!Array.isArray(votes)) {
      return new Response(JSON.stringify({ error: 'Invalid votes property' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid name property' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const voterId = uuidv4();

    const newVoter = {
      id: voterId,
      name: name,
      votes: votes,
    };

    if (!process.voters) {
      process.voters = [];
    }
    process.voters.push(newVoter);

    // Update the vote counts for each proposal
    const proposalUpdates: { [key: string]: any } = {};

    votes.forEach((vote: { proposalId: string; vote: number }) => {
      const proposalsArray = Object.values(process.proposals) as IProposal[];

      const proposalIndex = proposalsArray.findIndex((p: IProposal)  => p.id === vote.proposalId );
        

      if (proposalIndex) {
        proposalUpdates[`proposals/${proposalIndex}/votes/${voterId}`] = vote.vote;
      }
    });

    await update(processRef, {
      voters: process.voters,
      ...proposalUpdates,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};