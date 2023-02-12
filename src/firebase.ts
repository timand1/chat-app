import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkQF-cRWWw5p2EZy3KvStfuVaZMO6bZvU",
  authDomain: "chat-65325.firebaseapp.com",
  projectId: "chat-65325",
  storageBucket: "chat-65325.appspot.com",
  messagingSenderId: "476660762463",
  appId: "1:476660762463:web:ab8a2a19ff7f65badd18ea",
  measurementId: "G-EHE7952L16"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage();
export const db = getFirestore()
const analytics = getAnalytics(app);