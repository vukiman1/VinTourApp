import { Modal, Form, Input, Button } from "antd";
import React from "react";
import { BASE_URL } from "../../../utils/config";

const UserModal = ({ title, visible, onOk, onCancel, user }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // Assuming your API endpoint for updating user information is `${BASE_URL}/users/${user._id}`
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        onOk(); // Close the modal on successful update
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Modal title={title} visible={visible} onOk={handleOk} onCancel={onCancel}>
      <Form
        form={form}
        initialValues={user} // Populate form fields with user data
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
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
      </Form>
    </Modal>
  );
};

export default UserModal;
