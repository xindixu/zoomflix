import React from "react"
import { Form, Input, Button } from "antd"

type TProps = {
  next: () => void
}

const VideoForm = ({ next }: TProps) => {
  return (
    <>
      <Form.Item label="Name" name="videoName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="URL"
        name="videoUrl"
        rules={[{ required: true }, { type: "url" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" onClick={next}>
          Create Video
        </Button>
      </Form.Item>
    </>
  )
}

export default VideoForm
