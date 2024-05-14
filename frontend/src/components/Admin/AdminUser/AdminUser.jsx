import { WrapperHeader } from "./style";

import { PlusOutlined } from "@ant-design/icons";
import UserTableComponent from "../TableComponent/UserTableComponent";
import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, Upload } from "antd";
const AdminUser = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <div style={{ marginTop: " 10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={showModal}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <UserTableComponent />
      </div>
      <Modal
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
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
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Gentle">
            <Radio.Group>
              <Radio value="Nam"> Male </Radio>
              <Radio value="Nữ"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone">
            <Input />
          </Form.Item>
          <Form.Item label="Address">
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
