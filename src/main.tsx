import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './global.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFgQtar5JC-19YxPmkOvGi4PAD7IKuU-U",
  authDomain: "nursind-ea273.firebaseapp.com",
  projectId: "nursind-ea273",
  storageBucket: "nursind-ea273.appspot.com",
  messagingSenderId: "1032431065744",
  appId: "1:1032431065744:web:174a97c7ec21813d035615",
  measurementId: "G-DS5BYRQB3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
