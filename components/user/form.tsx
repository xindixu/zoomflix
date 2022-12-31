import React, { useEffect, useState } from "react"
import { Form, Button, Select, FormInstance } from "antd"

import { listUsers } from "../../lib/api"
import { TForm } from "../../pages/meetings/new"
import { TUser } from "../../context/auth"

type TProps = {
  onSubmit: (value: any) => void
  initialValues?: {
    participants: number[]
  }
  form: FormInstance<TForm>
}

const UserForm = ({ form, initialValues, onSubmit }: TProps) => {
  const [users, setUsers] = useState<TUser[]>([])

  const onFinish = (values) => {
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo)
  }

  useEffect(() => {
    try {
      listUsers().then((data) =>
        setUsers(data?.map((d) => ({ value: d.id, label: d.username })))
      )
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => form.resetFields(), [form, initialValues])

  return (
    <Form
      name="room"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item label="Participants" name="participants">
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
          Invite Participants
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserForm
