import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import UserTableComponent from "../TableComponent/UserTableComponent";
import { Button } from "antd";
import UserModal from "./UserModal";
import PushData from "../../../hooks/pushData";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => showModal(null)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <UserTableComponent onEdit={showModal} />
      </div>
      <UserModal
        title={currentUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        user={currentUser}
      />
    </div>
  );
};

export default AdminUser;
