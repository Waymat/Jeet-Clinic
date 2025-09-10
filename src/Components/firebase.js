import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_dftOGmJD_4IWqMnYJWj2Xp8KnR6g8ZI",
  authDomain: "jeetclinic-99c50.firebaseapp.com",
  projectId: "jeetclinic-99c50",
storageBucket: "jeetclinic-99c50.appspot.com",
  messagingSenderId: "302849658179",
  appId: "1:302849658179:web:dabf705029e82ce40473f6",
  measurementId: "G-YPBHZJ3B9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
