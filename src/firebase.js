// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCivGcFy3vcvlbfIa3-u6IcJyFH_rc0M_8",
  authDomain: "sign-log-in-779b8.firebaseapp.com",
  projectId: "sign-log-in-779b8",
  storageBucket: "sign-log-in-779b8.appspot.com",
  messagingSenderId: "405127370942",
  appId: "1:405127370942:web:a011725308e12d7dd4e6ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
 
export {app , auth};