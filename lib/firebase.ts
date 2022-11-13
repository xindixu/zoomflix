// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfYdg3e71-5N4veGjsHW_5W63uP-zB-_M",
  authDomain: "zoomflex-f90a2.firebaseapp.com",
  projectId: "zoomflex-f90a2",
  storageBucket: "zoomflex-f90a2.appspot.com",
  messagingSenderId: "963589976507",
  appId: "1:963589976507:web:04ff4435762089561d949e",
  measurementId: "G-B78PBYN65B",
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore(app)
