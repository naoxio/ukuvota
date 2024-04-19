import { ref, get } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';
import { getDownloadURL, ref as storageRef, getStorage } from 'firebase/storage';

export default async function fetchProcessData(processId: string): Promise<any> {
  let process;
  const processRef = ref(firebaseDB, `process/${processId}`);
  const snapshot = await get(processRef);
  if (snapshot.exists()) {
    process = snapshot.val();

    // Check if 'description' key does not exist and 'descriptionId' key exists
    if (!process.description && process.descriptionId) {
      const storage = getStorage();
      const descriptionRef = storageRef(storage, `descriptions/${process.descriptionId}.json`);
      try {
        const downloadURL = await getDownloadURL(descriptionRef);
        const response = await fetch(downloadURL);
        const descriptionContent = await response.json();
        process.description = JSON.parse(descriptionContent);
      } catch (error: any) {
        if (error && error.code === 'storage/object-not-found') {
          // Handle object not found error
          console.error('Object not found in Firebase Storage:', error.message);
        } else {
          // Handle other errors
          console.error('Error fetching description content:', error);
        }
      }
    }

    const currentTime = new Date().getTime();
    if (currentTime > process.proposalDates[1]) {
      if (!process.proposals) return undefined;
      const updatedProposals = await Promise.all(process.proposals.map(async (proposal: any) => {
        if (!proposal.description && proposal.id) {
          const storage = getStorage();
          const proposalDescriptionRef = storageRef(storage, `proposals/${proposal.id}.json`);
          try {
            const downloadURL = await getDownloadURL(proposalDescriptionRef);
            const response = await fetch(downloadURL);
            const proposalDescription = await response.text();
            proposal.description = JSON.parse(proposalDescription);
          } catch (error: any) {
            if (error && error.code === 'storage/object-not-found') {
              console.error('Proposal description not found in Firebase Storage:', error.message);
            } else {
              console.error('Error fetching proposal description:', error);
            }
          }
        }
        return proposal;
      }));

      process.proposals = updatedProposals;
    }

  } else {
    process = null;
  }
  return process;
}
