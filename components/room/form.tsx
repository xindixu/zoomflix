import React, { useEffect } from "react"
import { Form, Input, Button, Space } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

type TProps = {
  onSubmit: (value: any) => void
  initialValues?: {
    name: string
    videoURL: string
    participants: {
      name: string
      email: string
    }[]
  }
}

const RoomForm = ({ onSubmit, initialValues }: TProps) => {
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
      name="room"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item label="Room Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Video URL"
        name="videoUrl"
        rules={[{ required: true }, { type: "url" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Participants">
        <Form.List name="participants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    label="Email"
                    rules={[{ required: true }, { type: "email" }]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Participants
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Create Room
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RoomForm
