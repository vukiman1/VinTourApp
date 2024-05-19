import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { BASE_URL } from "../../../utils/config";
import TourTableComponent from "../TableComponent/TourTableComponent";
import TourModal from "./TourModal";

const AdminTour = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);

  const showModal = (tour) => {
    setCurrentTour(tour);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentTour(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentTour(null);
  };

  const handleDelete = async (tour) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tour._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        message.success("Tour deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <WrapperHeader>Quản lí tour</WrapperHeader>
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
        <TourTableComponent onEdit={showModal} onDelete={handleDelete} />
      </div>
      <TourModal
        title={currentTour ? "Chỉnh sửa tour" : "Thêm tour"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        tour={currentTour}
      />
    </div>
  );
};

export default AdminTour;
