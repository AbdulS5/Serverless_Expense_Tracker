// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0is7pH91-xJ8y1wjKe61UamTTvhGKMqw",
  authDomain: "serverlessexpensetracker.firebaseapp.com",
  projectId: "serverlessexpensetracker",
  storageBucket: "serverlessexpensetracker.firebasestorage.app",
  messagingSenderId: "516894016904",
  appId: "1:516894016904:web:168d0d1d42e209800be63d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);