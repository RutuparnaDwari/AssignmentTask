//Firebase key setup

// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// //web app's firebase configuration
// const firebaseConfig ={
//     apiKey: "AIzaSyAgh_O5dYHPMwyfekdv6Os8GY4TCBZ0w3w",
//     authDomain: "assignment-ce859.firebaseapp.com",
//     projectId: "assignment-ce859",
//     storageBucket: "assignment-ce859.appspot.com",
//     messagingSenderId: "654123676304",
//     appId: "1:654123676304:web:f2b7bcfa583a4866b99e15",
//     measurementId: "G-9KEJ1GKMWW"
// }

// if(!firebase.app.length){
//     firebase.initializeApp(firebaseConfig)
// }

// export {firebase};


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyAgh_O5dYHPMwyfekdv6Os8GY4TCBZ0w3w",
    authDomain: "assignment-ce859.firebaseapp.com",
    projectId: "assignment-ce859",
    storageBucket: "assignment-ce859.appspot.com",
    messagingSenderId: "654123676304",
    appId: "1:654123676304:web:f2b7bcfa583a4866b99e15",
    measurementId: "G-9KEJ1GKMWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
