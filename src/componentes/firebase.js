// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACdx54f2QCs_8QjHsIJ31ZAxfrqa01ewo",
  authDomain: "credenciales-d14d8.firebaseapp.com",
  projectId: "credenciales-d14d8",
  storageBucket: "credenciales-d14d8.appspot.com",
  messagingSenderId: "847663233050",
  appId: "1:847663233050:web:8e4b4f6f76bf6e22cef9a3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
