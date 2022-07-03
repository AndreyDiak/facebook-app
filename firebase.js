// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwPmFldXYmyNX9c1TvpSgvXQlQa6r681o",
  authDomain: "fb-clone-app-4ce7f.firebaseapp.com",
  projectId: "fb-clone-app-4ce7f",
  storageBucket: "fb-clone-app-4ce7f.appspot.com",
  messagingSenderId: "150249158775",
  appId: "1:150249158775:web:3e004ce3b654945686ee72",
  measurementId: "G-PE406WT2VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage()

export { db, storage }

