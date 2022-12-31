import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
  GoogleAuthProvider,
} from "firebase/auth"

import { auth } from "./firebase"
import { createUser } from "./users"

export const signIn = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    if (errorCode === "auth/wrong-password") {
      alert("Wrong password.")
    } else {
      alert(errorMessage)
    }
    console.log(error)
  }
}

export const signUp = async ({ email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await createUser({ uid: result.user.uid, email: result.user.email })
    return result
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
    console.log(error)
  }
}

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    await createUser({ uid: result.user.uid, email: result.user.email })
    return result
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
    console.log(error)
  }
}

export const signOut = () => signOutFirebase(auth)
// export const sendPasswordReset = ({ email }) => {
//   sendPasswordResetEmail(email)
//     .then(function () {
//       // Password Reset Email Sent!
//       alert("Password Reset Email Sent!")
//     })
//     .catch(function (error) {
//       // Handle Errors here.
//       const errorCode = error.code
//       const errorMessage = error.message
//       if (errorCode == "auth/invalid-email") {
//         alert(errorMessage)
//       } else if (errorCode == "auth/user-not-found") {
//         alert(errorMessage)
//       }
//       console.log(error)
//     })
// }

// export const sendEmailVerification = () =>
//   currentUser.sendEmailVerification().then(function () {
//     alert("Email Verification Sent!")
//   })
