import { ref, get } from 'firebase/database';
import { firebaseDB } from '@utils/firebaseConfig';

export default async function fetchProcessData(processId: string): Promise<any> {
  let process;
  const processRef = ref(firebaseDB, `process/${processId}`);
  const snapshot = await get(processRef);
  if (snapshot.exists()) {

    const processData = snapshot.val();
    const firstKey = Object.keys(processData)[0];
    process = processData[firstKey];
  } else {
    process = null;
  }
  return process;
}