// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore   } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3fcKxQetAryvmWDCRtaBUdtbhZ6Fx8Iw",
  authDomain: "deadlymovies-87464.firebaseapp.com",
  projectId: "deadlymovies-87464",
  storageBucket: "deadlymovies-87464.firebasestorage.app",
  messagingSenderId: "631236833509",
  appId: "1:631236833509:web:c0de16c85c7450194e640c",
  measurementId: "G-5XCLC0FYQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }