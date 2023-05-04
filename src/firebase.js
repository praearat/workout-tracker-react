// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPzcNjb1teMAsx1NKK3Z_5hyM79jO-yB8",
  authDomain: "workout-tracker-react-a8237.firebaseapp.com",
  projectId: "workout-tracker-react-a8237",
  storageBucket: "workout-tracker-react-a8237.appspot.com",
  messagingSenderId: "1003074275846",
  appId: "1:1003074275846:web:bf6efa2d8e6c4dcb009187",
  measurementId: "G-2RCVHEJ8F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
