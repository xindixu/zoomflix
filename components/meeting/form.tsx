import React, { useEffect, useState } from "react"
import { Form, Input, Button, Select } from "antd"
import { listUsers } from "../../lib/users"

type TProps = {
  onSubmit: (value: any) => void
  initialValues?: {
    videoName: string
    videoURL: string
    participantIds: string[]
  }
}

const MeetingForm = ({ onSubmit, initialValues }: TProps) => {
  const [form] = Form.useForm()
  const [users, setUsers] = useState<{ value: string; label: string }[]>([])

  const onFinish = (values) => {
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo)
  }

  useEffect(() => form.resetFields(), [form, initialValues])

  useEffect(() => {
    try {
      listUsers().then((data) =>
        setUsers(data?.map((d) => ({ value: d.uid, label: d.email })))
      )
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Form
      name="meeting"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item
        label="Video Name"
        name="videoName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Video URL"
        name="videoUrl"
        rules={[{ required: true }, { type: "url" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Participants"
        name="participantIds"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          options={users}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Create Meeting
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MeetingForm
