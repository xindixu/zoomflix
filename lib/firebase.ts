// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3xtdsrDPz7Xf3prqPU1Ng9g8f1-GM8RA",
  authDomain: "zoomflix-7aa9a.firebaseapp.com",
  projectId: "zoomflix-7aa9a",
  storageBucket: "zoomflix-7aa9a.appspot.com",
  messagingSenderId: "762981240503",
  appId: "1:762981240503:web:8bd69e6e3ab1f859598732",
  measurementId: "G-8DWVS4HYZ9",
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore(app)
