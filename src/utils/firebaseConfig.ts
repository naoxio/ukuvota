import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBijzjkWVepv9FxY3Rc1xE7NdgjWQc0PwM",
  authDomain: "impactful-yeti-387506.firebaseapp.com",
  databaseURL: "https://impactful-yeti-387506-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "impactful-yeti-387506",
  storageBucket: "impactful-yeti-387506.appspot.com",
  messagingSenderId: "259081600268",
  appId: "1:259081600268:web:cd2e0d4d312f20c7205d29"
};


const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export { app, firebaseDB };