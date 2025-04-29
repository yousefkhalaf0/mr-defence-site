// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ⬅️ جديدة
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcN5he4zN046-_ukMN9aLzDlJs07gCuaE",
  authDomain: "mr-defence-d9934.firebaseapp.com",
  projectId: "mr-defence-d9934",
  storageBucket: "mr-defence-d9934.appspot.com", 
  messagingSenderId: "475084501813",
  appId: "1:475084501813:web:8405774d79ba0825a6527c",
  measurementId: "G-EDW96QQFCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ⬅️ جديدة
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export { db, auth }; // ⬅️ نصدر الـ auth كمان
