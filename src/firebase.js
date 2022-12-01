

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLxEP3ltVUbdyP-vIxZ3n7QCmTCJjwLNs",
    authDomain: "bad-bank-72121.firebaseapp.com",
    projectId: "bad-bank-72121",
    storageBucket: "bad-bank-72121.appspot.com",
    messagingSenderId: "17830569440",
    appId: "1:17830569440:web:173e09602eda4533c8b785"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);