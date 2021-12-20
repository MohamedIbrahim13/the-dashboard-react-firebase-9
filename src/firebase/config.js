import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz6q7gZucbemC4lnde71Mb6Yxj3R0aUn0",
  authDomain: "pwa-project-28b35.firebaseapp.com",
  projectId: "pwa-project-28b35",
  storageBucket: "pwa-project-28b35.appspot.com",
  messagingSenderId: "203789788566",
  appId: "1:203789788566:web:f9e52d881fb0c6b665e9b7",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage(initializeApp(firebaseConfig));

export { db, auth, storage };
