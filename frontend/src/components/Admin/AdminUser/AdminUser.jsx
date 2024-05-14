import { WrapperHeader } from "./style";

import { PlusOutlined } from "@ant-design/icons";
import UserTableComponent from "../TableComponent/UserTableComponent";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Upload,
} from "antd";
import UserModal from "./UserModal";

const AdminUser = () => {
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
      <UserModal
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminUser;
