import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { db } from "./firebase"
import { TUser } from "../context/auth"

export const createUser = async ({ uid, email }) => {
  const usersRef = doc(db, `/users/${uid}`)
  await setDoc(usersRef, { email })
}

export const listUsers = async () => {
  const usersRef = collection(db, "users")
  const q = query(usersRef, orderBy("email"))
  const querySnapshot = await getDocs(q)

  const users: TUser[] = []
  querySnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() } as TUser)
    console.log(doc.id, " => ", doc.data())
  })

  return users
}
