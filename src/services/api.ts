import GUN from "gun";
import type IProcess from '@interfaces/IProcess'
import type IVoter from '@interfaces/IVoter'

const gun = GUN({ peers: ['http://localhost:8765/gun'] });

export const fetchProcess = async (processId: string): Promise<IProcess> => {
  return new Promise((resolve) => {
    gun.get(`process-${processId}`).once((data) => {
      resolve(data);
    });
  });
};

export const addProposal = async (processId: string, data: any) => {
  return new Promise((resolve) => {
    const proposalsNode = gun.get(`process-${processId}`).get('proposals');
    proposalsNode.set(data, (ack: any) => {
      if (ack.err) {
        console.error('Error adding proposal:', ack.err);
        resolve(null);
      } else {
        proposalsNode.map().once((proposal) => {
          resolve(proposal);
        });
      }
    });
  });
};

export const updateProposal = async (processId: string, proposalId: string, data: any) => {
  return new Promise((resolve) => {
    const proposalNode = gun.get(`process-${processId}`).get('proposals').get(proposalId).put(data);
    proposalNode.once((updatedProposal) => {
      resolve(updatedProposal);
    });
  });
};

export const deleteProposal = async (processId: string, proposalId: string) => {
  return new Promise((resolve) => {
    const proposalNode = gun.get(`process-${processId}`).get('proposals').get(proposalId).put(null);
    proposalNode.once((deletedProposal) => {
      resolve(deletedProposal);
    });
  });
};

export const createNewProcess = async (body: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    gun.get('process').set(body, (ack: any) => {
      if (ack.err) {
        console.error('Error creating process:', ack.err);
        reject(ack.err);
      } else {
        resolve(body);
      }
    });
  });
};

export const submitVote = async (processId: string, vote: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    gun.get(`process-${processId}`).get('votes').set(vote, (ack: any) => {
      if (ack.err) {
        console.error('Error submitting vote:', ack.err);
        reject(ack.err);
      } else {
        // acknowledge successful write
        resolve(vote);
      }
    });
  });
};


export const getVoters = async (processId): Promise<IVoter[]>  => {
  return new Promise((resolve) => {
    gun.get(`process-${processId}`).get('voters').once((voters) => {
      resolve(voters);
    });
  });
};
