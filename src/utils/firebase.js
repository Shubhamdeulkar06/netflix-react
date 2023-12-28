// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw1t-F8akAizbmhGokkuNGMxuz9x-1C-4",
  authDomain: "netflixgpt-2c80d.firebaseapp.com",
  projectId: "netflixgpt-2c80d",
  storageBucket: "netflixgpt-2c80d.appspot.com",
  messagingSenderId: "708593551018",
  appId: "1:708593551018:web:1aa62dd79f3e790f2f72d3",
  measurementId: "G-6PXD95R1FS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
