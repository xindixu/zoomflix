import {
  addDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export const createCall = async ({ id, peerConnection }) => {
  const callsRef = doc(db, `/calls/${id}`)
  const offerCandidatesRef = collection(db, `/calls/${id}/offerCandidates`)
  const answerCandidatesRef = collection(db, `/calls/${id}/answerCandidates`)

  // Get candidates for caller, save to db
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(offerCandidatesRef, event.candidate.toJSON())
    }
  }

  // Create offer
  const offerDescription = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offerDescription)

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  }

  await setDoc(callsRef, { offer })

  // Listen for remote answer
  onSnapshot(callsRef, (snapshot) => {
    const data = snapshot.data()
    if (!peerConnection.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer)
      peerConnection.setRemoteDescription(answerDescription)
    }
  })

  // When answered, add candidates to peer connection
  onSnapshot(answerCandidatesRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data())
        peerConnection.addIceCandidate(candidate)
      }
    })
  })
}

export const answerCall = async ({ id, peerConnection }) => {
  const callsRef = doc(db, `/calls/${id}`)
  const offerCandidatesRef = collection(db, `/calls/${id}/offerCandidates`)
  const answerCandidatesRef = collection(db, `/calls/${id}/answerCandidates`)

  // Get candidates for callee, save to db
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(answerCandidatesRef, event.candidate.toJSON())
    }
  }

  // Get offer
  const callData = (await getDoc(callsRef)).data()
  const offerDescription = callData?.offer
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(offerDescription)
  )

  // Create answer
  const answerDescription = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answerDescription)

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  }

  await updateDoc(callsRef, { answer })

  // Listen for remote callings
  onSnapshot(offerCandidatesRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data())
        peerConnection.addIceCandidate(candidate)
      }
    })
  })
}
