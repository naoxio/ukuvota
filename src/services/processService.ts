import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

import 'dotenv/config';
    
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  

const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export default async function fetchProcessData(processId: string): Promise<any> {
    let process;

    const processRef = ref(firebaseDB, `process/${processId}`);
    const snapshot = await get(processRef);

    if (snapshot.exists()) {
        const processData = snapshot.val();
        const processValues = Object.values(processData);
        process = processValues[0];
    } else {
        process = null;
    }
    return process;
}