import { WrapperHeader } from "../AdminUser/style";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Modal } from "antd";
import TourTableComponent from "../TableComponent/TourTableComponent";
const AdminTour = () => {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
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
      <WrapperHeader>Quản lí Tour</WrapperHeader>
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
        <TourTableComponent />
      </div>
      <Modal
        title="Thêm Tour"
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
          <Form.Item label="Title">
            <Input />
          </Form.Item>
          <Form.Item label="Location">
            <Input />
          </Form.Item>
          <Form.Item label="Hotel">
            <Input />
          </Form.Item>
          <Form.Item label="Price">
            <Input />
          </Form.Item>
          <Form.Item label="RangePicker">
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="Image"
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
          <Form.Item label="Description">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminTour;
