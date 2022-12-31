import React, { useContext, useState } from "react"
import { Form, Steps, Typography } from "antd"

import AuthContext from "../../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../../components/protected-routes"

import MeetingForm from "../../components/meeting/form"
import { createMeeting } from "../../lib/meetings"

const { Title } = Typography

const Meetings = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) return null

  const onSubmit = async (value) => {
    const meeting = await createMeeting(value)
    router.push(`/meetings/${meeting.id}`)
  }

  return (
    <div>
      <Title level={2}>Create a meeting</Title>
      <MeetingForm onSubmit={onSubmit} hostId={currentUser.uid} />
    </div>
  )
}

export default withProtectedRoute(Meetings)
