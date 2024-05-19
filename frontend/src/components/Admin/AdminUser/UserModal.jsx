import { Modal, Form, Input, Select, message } from "antd";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

const UserModal = ({ title, visible, onOk, onCancel, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (user) {
        form.setFieldsValue(user);
      }
    }
  }, [visible, user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);

      const url = user
        ? `${BASE_URL}/users/${user._id}`
        : `${BASE_URL}/auth/register`;
      const method = user ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        onOk(); // Close the modal on successful update or creation
        setTimeout(() => {
          window.location.reload();
        }, 500);
        message.success(`User ${user ? "updated" : "created"} successfully`);
      }
    } catch (error) {
      console.error(`Failed to ${user ? "update" : "create"} user:`, error);
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
          // rules={[
          //   { required: true, message: "Please input your phone number!" },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          // rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={
            !user
              ? [{ required: true, message: "Please input your password!" }]
              : []
          }
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
