import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

type TVideo = {
  paused: boolean
  currentTime: number
}

export const updateVideo = async (id: string, video: TVideo) => {
  const videoRef = doc(db, `/videos/${id}`)

  const result = await setDoc(videoRef, video)
  return result
}
