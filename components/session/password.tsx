/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react"
import NextLink from "next/link"
import { Form, Input, Button, Typography, notification } from "antd"
import { SIGNIN, SIGNUP, BUTTON_TEXT } from "./index"

const { Text, Link } = Typography
import { signUp, signIn } from "../../lib/auth"

type Props = {
  type: typeof SIGNIN | typeof SIGNUP
  onSuccess: (user: any) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  initialValues: {
    name?: string
    password: string
    email: string
  }
}

const NOTIFICATIONS = {
  SIGNUP: "Sign Up Failed",
  SIGNIN: "Sign In Failed",
}

const KEY = "session-create-error"

const ACTIONS = {
  SIGNUP: signUp,
  SIGNIN: signIn,
}

const openNotification = (title, msg) => {
  notification.error({
    message: title,
    description: msg,
    duration: 0,
    key: KEY,
  })
}

function Password({ type, onSuccess, initialValues, setIsSubmitting }: Props) {
  const [form] = Form.useForm()

  useEffect(() => {
    return () => {
      notification.destroy(KEY)
    }
  }, [])

  useEffect(() => form.resetFields(), [form, initialValues])

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo)
  }

  const onFinish = async (values) => {
    try {
      notification.destroy(KEY)
      setIsSubmitting(true)
      // @ts-ignore
      const user = await ACTIONS[type](values)
      console.log(user)
      onSuccess(user)
    } catch (err) {
      // @ts-ignore
      openNotification(NOTIFICATIONS[type], err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      name="session"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      {type === SIGNUP && (
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        {type === SIGNIN ? (
          <Text type="secondary">
            New to Zoomflix? Please{" "}
            <NextLink href="/sign-up" passHref>
              <Link>{BUTTON_TEXT[SIGNUP]}</Link>
            </NextLink>
            .
          </Text>
        ) : (
          <Text type="secondary">
            Already a Zoomflix user? Please{" "}
            <NextLink href="/sign-in" passHref>
              <Link>{BUTTON_TEXT[SIGNIN]}</Link>
            </NextLink>
            .
          </Text>
        )}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {BUTTON_TEXT[type]}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Password
