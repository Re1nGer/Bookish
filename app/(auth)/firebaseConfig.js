// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDn5EvcbDmAOPkmwH_J7TeRyMFxeLquUi0",

  authDomain: "react-native-test-a8948.firebaseapp.com",

  projectId: "react-native-test-a8948",

  storageBucket: "react-native-test-a8948.appspot.com",

  messagingSenderId: "691662689785",

  appId: "1:691662689785:web:0923919f66aa0386cc1928",

  measurementId: "G-2FLHERPQ2K"

};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
