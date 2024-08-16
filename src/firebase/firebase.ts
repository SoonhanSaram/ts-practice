import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey : process.env.NEXT_PUBLIC_FIREBASE_APP_KEY,
    authDomain : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket : process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
    appId : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId : process.env.NEXT_PUBLIC_MEASUREMENTID
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
// const messaging = getMessaging();
// const db = getFirestore(app);
// const auth = getAuth(app);

export const setTokenHandler = async () => {
    const messaging = getMessaging(app);
    await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log("fcm 토큰 ======================================", currentToken);
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        })
}

export {app, firebaseConfig};