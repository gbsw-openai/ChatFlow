import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseSetting = {
    apiKey: "AIzaSyA87YAOan8Zb_hiA7Lr9tH7qBfreYWILwo",
    authDomain: "chatflow-f05cb.firebaseapp.com",
    projectId: "chatflow-f05cb",
    storageBucket: "chatflow-f05cb.appspot.com",
    messagingSenderId: "1031356494041",
    appId: "1:1031356494041:web:e8e2ed7fe0f462d4330ec8",
    measurementId: "G-LGL23KNLXZ"
};

const app = initializeApp(firebaseSetting);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const timestamp = serverTimestamp();

export { auth, googleProvider, db, timestamp };
export default app;