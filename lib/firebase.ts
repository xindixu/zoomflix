import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "")

const app = firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore(app)
