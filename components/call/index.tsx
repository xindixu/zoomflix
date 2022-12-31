import { Button, Col, Row } from "antd"
import React, { useCallback, useRef, useState } from "react"
import { answerCall, createCall } from "../../lib/calls"

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

const Call = ({ id, isHost }) => {
  const peerConnection = useRef(new RTCPeerConnection(servers))
  const localStream = useRef<MediaStream | null>(null)
  const remoteStream = useRef<MediaStream | null>(null)
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)

  const [step, setStep] = useState(START_WEBCAM)

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
    await createCall({ id, peerConnection: peerConnection.current })
    setStep(JOINED_CALL)
  }, [id])

  const answerOffer = useCallback(async () => {
    await answerCall({ id, peerConnection: peerConnection.current })
    setStep(JOINED_CALL)
  }, [id])

  return (
    <div>
      {step === START_WEBCAM && (
        <>
          <p>Start your webcam</p>
          <Button onClick={setUpVideos}>Turn on web cam</Button>
        </>
      )}

      {step === START_CALL && (
        <>
          {isHost ? (
            <Button onClick={createOffer}>Start the call</Button>
          ) : (
            <Button onClick={answerOffer} disabled={!id}>
              Join the call
            </Button>
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
