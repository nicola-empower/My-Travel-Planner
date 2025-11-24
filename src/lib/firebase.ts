import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2YaBy51O6_KNEu8mJwBVRKIkawN5vSiM",
  authDomain: "my-wee-wander-planner-data.firebaseapp.com",
  projectId: "my-wee-wander-planner-data",
  storageBucket: "my-wee-wander-planner-data.firebasestorage.app",
  messagingSenderId: "627062846720",
  appId: "1:627062846720:web:01c83374e1beca22626fe5",
  measurementId: "G-5Y83126615"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, db, auth };
