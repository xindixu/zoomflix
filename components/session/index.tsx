import React, { useEffect, useState } from "react"
import { Divider, notification, Spin, Typography, Col, Row } from "antd"

import { signUp, signIn } from "../../lib/auth"
import NewSession from "./password"
import GoogleForm from "./google"

const { Title, Text } = Typography

const PROMPTS = {
  SIGNUP: {
    title: "Sign up",
    text: "Sign up to fully enjoy exciting features offered by Zoomflix",
  },
  SIGNIN: {
    title: "Sign in",
    text: "Sign in to enjoy all features offered by Zoomflix",
  },
}

export const SIGNIN = "SIGNIN"
export const SIGNUP = "SIGNUP"

export const BUTTON_TEXT = {
  SIGNIN: "Sign in",
  SIGNUP: "Sign up",
}

type TProps = {
  type: typeof SIGNIN | typeof SIGNUP
  initialEmail?: string
  onSuccess: (user: any) => void
}

function Session({ type, initialEmail = "", onSuccess }: TProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content = (
    <>
      <NewSession
        type={type}
        onSuccess={onSuccess}
        setIsSubmitting={setIsSubmitting}
        // @ts-ignore
        initialValues={{ email: initialEmail }}
      />
      <Col offset={4} span={16}>
        <Divider plain> Or </Divider>
        <GoogleForm
          type={type}
          onSuccess={onSuccess}
          setIsSubmitting={setIsSubmitting}
        />
      </Col>
    </>
  )

  return (
    <>
      <Row>
        <Col offset={4}>
          <Title level={2}>{PROMPTS[type].title}</Title>
          <Text>{PROMPTS[type].text}</Text>
        </Col>
      </Row>
      {isSubmitting ? <Spin>{content}</Spin> : content}
    </>
  )
}

export default Session
