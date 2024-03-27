import { ref, get } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';

export default async function fetchProcessData(processId: string): Promise<any> {
  let process;
  const processRef = ref(firebaseDB, `process/${processId}`);
  const snapshot = await get(processRef);
  if (snapshot.exists()) {
    process = snapshot.val();
  } else {
    process = null;
  }
  return process;
}