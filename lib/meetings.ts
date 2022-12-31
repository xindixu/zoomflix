import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export const createMeeting = async ({
  hostId,
  participantIds,
  videoName,
  videoUrl,
}) => {
  const meetingsRef = collection(db, "meetings")
  const result = await addDoc(meetingsRef, {
    hostId,
    participantIds,
    videoName,
    videoUrl,
  })

  return result
}

export const getMeeting = async (id: string) => {
  const meetingRef = doc(db, `meetings/${id}`)
  const meeting = await getDoc(meetingRef)

  if (meeting.exists()) {
    return meeting.data()
  } else {
    return null
  }
}
