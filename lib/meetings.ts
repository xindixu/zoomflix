import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  FieldPath,
  documentId,
} from "firebase/firestore"
import emailjs from "@emailjs/browser"
import { db } from "./firebase"

type TRecipient = { email: string; name: string }

export const sendInvites = async ({
  id,
  hostId,
  participantIds,
  videoName,
}) => {
  // get participant emails & names
  const usersRef = collection(db, "users")
  const q = query(usersRef, where(documentId(), "in", participantIds))
  const participants: TRecipient[] = []

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data = doc.data() as TRecipient
    participants.push(data)
  })

  const hostSnapshot = await getDoc(doc(db, `users/${hostId}`))
  const host = hostSnapshot.data() as TRecipient

  const requests = participants.map((participant) => {
    // send email to participant
    const template_params = {
      from_email: host.email,
      from_name: host.name,
      to_email: participant.email,
      to_name: participant.name,
      url: `${window.location.origin}/meetings/${id}`,
      video_name: videoName,
    }
    return emailjs.send(
      "default_service",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      template_params,
      process.env.NEXT_PUBLIC_EMAILJS_KEY
    )
  })

  return Promise.all(requests).then((responses) => {
    console.log(responses)
  })
}

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
