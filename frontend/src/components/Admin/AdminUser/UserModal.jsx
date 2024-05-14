import React, { useEffect } from "react";
import { Modal, Form, Input, Radio, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UserModal = ({ title, visible, onOk, onCancel, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Name"
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload action="/upload.do" listType="picture-card">
            <Button icon={<PlusOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
