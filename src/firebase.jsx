import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkw61AhOvL1dTXod07WHiiXWz8rNrjaKY",
    authDomain: "flightease-3912a.firebaseapp.com",
    projectId: "flightease-3912a",
    storageBucket: "flightease-3912a.firebasestorage.app",
    messagingSenderId: "888741709840",
    appId: "1:888741709840:web:a431a83606dcdb1c036295",
    measurementId: "G-841B4C1QVR"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, app, firebaseConfig };