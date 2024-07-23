import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey : process.env.NEXT_FIREBASE_APP_KEY,
    authDomain : process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.NEXT_FIREBASE_PROJECTID,
    storageBucket : process.env.NEXT_FIREBASE_STORAGEBUCKET,
    messagingSenderId : process.env.NEXT_FIREBASE_MSG_SENDER_ID,
    appId : process.env.NEXT_FIREBASE_APP_ID,
    measurementId : process.env.MEASUREMENTID
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

console.log(app);

export {app, db, auth, analytics};