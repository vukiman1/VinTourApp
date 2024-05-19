import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import HotelTableComponent from "../TableComponent/HotelTableComponent";
import HotelModal from "./HotelModal";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
const AdminHotel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  

  const showModal = (hotel) => {
    setCurrentHotel(hotel);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentHotel(null);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentHotel(null);
  };

  const handleDelete = async (hotel) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel/${hotel._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        message.success("Hotel deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      
      }
    } catch (error) {
      console.error("Failed to delete hotel:", error);
    }
  };

  return (
    <div style={{ marginLeft: "40px" }}>
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
        <HotelTableComponent onEdit={showModal} onDelete={handleDelete} />
      </div>
      <HotelModal
        title={currentHotel ? "Chỉnh sửa khách sạn" : "Thêm khách sạn"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        hotel={currentHotel}
      />
    </div>
  );
};

export default AdminHotel;
