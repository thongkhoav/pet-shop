// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pet-shop-4250f.firebaseapp.com",
  projectId: "pet-shop-4250f",
  storageBucket: "pet-shop-4250f.appspot.com",
  messagingSenderId: "552938212112",
  appId: "1:552938212112:web:85425dc06ed337b51e7395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();