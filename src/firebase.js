// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcN5he4zN046-_ukMN9aLzDlJs07gCuaE",
  authDomain: "mr-defence-d9934.firebaseapp.com",
  projectId: "mr-defence-d9934",
  storageBucket: "mr-defence-d9934.firebasestorage.com",
  messagingSenderId: "475084501813",
  appId: "1:475084501813:web:8405774d79ba0825a6527c",
  measurementId: "G-EDW96QQFCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const analytics = getAnalytics(app);
export {db};