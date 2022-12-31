import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
  GoogleAuthProvider,
} from "firebase/auth"

import { auth } from "./firebase"
import { createUser, getUser } from "./users"

export const signIn = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = result.user
    const user = await getUser(uid)
    return user
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

export const signUp = async ({ name, email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = result.user
    const user = { uid, email, name }
    await createUser(user)
    return user
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
    const { uid, email, displayName: name } = result.user
    const user = {
      uid,
      email,
      name,
    }
    await createUser(user)
    return user
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
