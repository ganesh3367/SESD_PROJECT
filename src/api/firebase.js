import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByZFUBpg7JQUOh7zYm50su2l6SUdFEde0",
  authDomain: "sesdproject.firebaseapp.com",
  projectId: "sesdproject",
  storageBucket: "sesdproject.firebasestorage.app",
  messagingSenderId: "683159857245",
  appId: "1:683159857245:web:a88601634b8d12ec6845b4",
  measurementId: "G-1SN1XW3R3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
