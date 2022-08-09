// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyb75mq2XachyoCkNz9ZzRYobimAuGarI",
  authDomain: "instagram-clone-d11ed.firebaseapp.com",
  projectId: "instagram-clone-d11ed",
  storageBucket: "instagram-clone-d11ed.appspot.com",
  messagingSenderId: "675109690272",
  appId: "1:675109690272:web:223baa300cbf05f59662c5",
  measurementId: "G-F9ZV2DMDFC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
