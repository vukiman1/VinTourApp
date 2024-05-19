import { Modal, Form, Input, InputNumber, message, Select } from "antd";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

const OrderModal = ({ title, visible, onOk, onCancel, order }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (order) {
        form.setFieldsValue(order);
      }
    }
  }, [visible, order, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const url = order
        ? `${BASE_URL}/booking/${order._id}`
        : `${BASE_URL}/booking`;
      const method = order ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      onOk();
      window.location.reload();
      if (response.ok) {
        message.success(`Order ${order ? "updated" : "created"} successfully`);
      }
    } catch (error) {
      message.success(`Order ${order ? "updated" : "created"} successfully`);
      window.location.reload();
    }
  };

  return (
    <Modal title={title} open={visible} onOk={handleOk} onCancel={onCancel}>
      <Form
        form={form}
        initialValues={order}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Customer Name"
          name="fullName"
          rules={[{ required: true, message: "Please input customer name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Confirmed">Confirmed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Email"
          name="userEmail"
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
          label="People"
          name="guestSize"
          rules={[
            { required: true, message: "Please input the total people!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;
