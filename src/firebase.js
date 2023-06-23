// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDWVlmPz7bdDTBzY859C7DVGQYqvQ1Ox9s",
    authDomain: "trufflehealth-f34a1.firebaseapp.com",
    projectId: "trufflehealth-f34a1",
    storageBucket: "trufflehealth-f34a1.appspot.com",
    messagingSenderId: "560928826722",
    appId: "1:560928826722:web:7854f38c793d470a41b83b",
    measurementId: "G-EG9VZZ5B0S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// connecting to firebase database ::: we are exporting this bcoz we might need else where
export const db = getFirestore(app);
// for firbase storage
export const firebaseStorage = getStorage(app)
