import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfIGAK_d5lLpa5agvqyfL64XcRrYPA5yE",
  authDomain: "my-gif-app-6e4c6.firebaseapp.com",
  projectId: "my-gif-app-6e4c6",
  storageBucket: "my-gif-app-6e4c6.appspot.com",
  messagingSenderId: "961887444435",
  appId: "1:961887444435:web:0a2965d050b7fc98d3a326",
  measurementId: "G-YFSR3YLMXF"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
console.log('Auth instance:', auth);

export {auth};