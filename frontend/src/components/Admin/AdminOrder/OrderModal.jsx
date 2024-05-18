import { Modal, Form, Input, InputNumber, message } from "antd";
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
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(`Order ${order ? "updated" : "created"} successfully`);
        onOk();
      } else {
        message.error(`Failed to ${order ? "update" : "create"} order`);
      }
    } catch (error) {
      console.error(`Failed to ${order ? "update" : "create"} order:`, error);
      message.error(
        `An error occurred while ${order ? "updating" : "creating"} the order`
      );
    }
  };

  return (
    <Modal title={title} visible={visible} onOk={handleOk} onCancel={onCancel}>
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
          name="customerName"
          rules={[{ required: true, message: "Please input customer name!" }]}
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
          label="Total Amount"
          name="totalAmount"
          rules={[
            { required: true, message: "Please input the total amount!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;
