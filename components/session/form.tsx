/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react"
import NextLink from "next/link"
import { Form, Input, Button, Typography } from "antd"

const { Text, Link } = Typography

export const SIGNIN = "SIGNIN"
export const SIGNUP = "SIGNUP"

const BUTTON_TEXT = {
  SIGNIN: "Sign in",
  SIGNUP: "Sign up",
}

type TProps = {
  type: typeof SIGNIN | typeof SIGNUP
  onSubmit: (value: any) => {}
  initialValues: {
    username: string
    password: string
    email: string
  }
}

function SessionForm({ type, onSubmit, initialValues }: TProps) {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo)
  }

  useEffect(() => form.resetFields(), [form, initialValues])

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {type === SIGNUP && (
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item>
      )}

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
            New to Zoomflex? Please{" "}
            <NextLink href="/sign-up" passHref>
              <Link>{BUTTON_TEXT[SIGNUP]}</Link>
            </NextLink>
            .
          </Text>
        ) : (
          <Text type="secondary">
            Already a Zoomflex user? Please{" "}
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

export default SessionForm
