import { Button, Col, Row, Input } from "antd"
import React, { useCallback, useRef, useState } from "react"
import { firestore } from "../../lib/firebase"

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
}

const START_WEBCAM = "START_WEBCAM"
const START_CALL = "START_CALL"
const JOINED_CALL = "JOINED_CALL"

const Call = () => {
  const peerConnection = useRef(new RTCPeerConnection(servers))
  const localStream = useRef<MediaStream | null>(null)
  const remoteStream = useRef<MediaStream | null>(null)
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)

  const [callId, setCallId] = useState("")
  const [step, setStep] = useState(START_WEBCAM)
  const [isHost, setIsHost] = useState(false)

  const setUpVideos = useCallback(async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    remoteStream.current = new MediaStream()

    // push tracks from local stream to peer connection
    localStream.current.getTracks().forEach((track) => {
      if (localStream.current) {
        peerConnection.current.addTrack(track, localStream.current)
      }
    })

    // pull tracks from peer connection to remote stream
    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current?.addTrack(track)
      })
    }

    // update video srcs
    if (localVideo.current) {
      localVideo.current.srcObject = localStream.current
    }
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = remoteStream.current
    }
    setStep(START_CALL)
  }, [])

  const createOffer = useCallback(async () => {
    const callDoc = firestore.collection("calls").doc()
    const offerCandidates = callDoc.collection("offerCandidates")
    const answerCandidates = callDoc.collection("answerCandidates")

    setCallId(callDoc.id)
    setIsHost(true)

    // Get candidates for caller, save to db
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        offerCandidates.add(event.candidate.toJSON())
      }
    }

    // Create offer
    const offerDescription = await peerConnection.current.createOffer()
    await peerConnection.current.setLocalDescription(offerDescription)

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }

    await callDoc.set({ offer })

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data()
      if (!peerConnection.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer)
        peerConnection.current.setRemoteDescription(answerDescription)
      }
    })

    // When answered, add candidates to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data())
          peerConnection.current.addIceCandidate(candidate)
        }
      })
    })

    setStep(JOINED_CALL)
  }, [])

  const answerCall = useCallback(async () => {
    if (!callId) {
      return
    }

    const callDoc = firestore.collection("calls").doc(callId)
    const offerCandidates = callDoc.collection("offerCandidates")
    const answerCandidates = callDoc.collection("answerCandidates")

    // Get candidates for callee, save to db
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        answerCandidates.add(event.candidate.toJSON())
      }
    }

    // Get offer
    const callData = (await callDoc.get()).data()
    const offerDescription = callData?.offer
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    )

    // Create answer
    const answerDescription = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(answerDescription)

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    }

    await callDoc.update({ answer })

    // Listen for remote ICE candidates
    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data()
          peerConnection.current.addIceCandidate(new RTCIceCandidate(data))
        }
      })
    })

    setStep(JOINED_CALL)
  }, [callId])

  return (
    <div>
      {step === START_WEBCAM && (
        <>
          <p>Step 1:</p>
          <p>Start your webcam</p>
          <Button onClick={setUpVideos}>Turn on web cam</Button>
        </>
      )}

      {step === START_CALL && (
        <>
          <p>Step 2:</p>
          <p>Start a new call</p>
          <Button onClick={createOffer}>Start a call</Button>
          {isHost || (
            <>
              <p>Or join an existing call</p>
              <Input
                type="text"
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
              />
              <Button onClick={answerCall} disabled={!callId}>
                Join the call
              </Button>
            </>
          )}
        </>
      )}

      {step === JOINED_CALL && (
        <>
          <p>Step 3:</p>
          {isHost && !!callId ? (
            <p>Please share this call ID: {callId} </p>
          ) : (
            <p>Joined</p>
          )}
        </>
      )}

      <Row>
        <Col span={12}>
          <video ref={localVideo} autoPlay playsInline />
        </Col>
        <Col span={12}>
          <video ref={remoteVideo} autoPlay playsInline />
        </Col>
      </Row>
    </div>
  )
}

export default Call
