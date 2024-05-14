import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import UserTableComponent from "../TableComponent/UserTableComponent";
import { Button, message } from "antd";
import UserModal from "./UserModal";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { data: refetch } = useFetch(`${BASE_URL}/users`); // Get the refetch function

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentUser(null); // Reset current user after closing modal
    refetch(); // Trigger refetch to update the user list after update or creation
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentUser(null); // Reset current user after closing modal
  };

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        message.success("User deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
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
          onClick={() => showModal(null)} // Show modal with null to create new user
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <UserTableComponent
          onEdit={showModal}
          onDelete={handleDelete}
          refetch={refetch}
        />
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
