import React, { useContext, useState } from "react"
import { Form, Steps, Typography } from "antd"

import AuthContext from "../../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../../components/protected-routes"

import MeetingForm from "../../components/meeting/form"
import { createMeeting } from "../../lib/meetings"

const { Title } = Typography

export type TForm = {
  videoName: string
  videoUrl: string
  participantIds: string[]
}

const Meetings = () => {
  return (
    <div>
      <Title level={2}>Create a meeting</Title>
      <MeetingForm onSubmit={createMeeting} />
    </div>
  )
}

export default withProtectedRoute(Meetings)
