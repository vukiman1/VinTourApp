import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";
import OrderModal from "./OrderModal";
import OrderTableComponent from "../TableComponent/OrderTableComponent";

const AdminOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { refetch } = useFetch(`${BASE_URL}/booking`);

  const showModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
    refetch();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = async (record) => {
    // try {
    //   const response = await fetch(`${BASE_URL}/booking/${record._id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   });
    //   if (response.ok) {
    //     message.success("Order deleted successfully");
    //   }
    // } catch (error) {
    //   console.error("Failed to delete order:", error);
    // }
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <WrapperHeader>Order Management</WrapperHeader>
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
        <OrderTableComponent onEdit={showModal} onDelete={handleDelete} />
      </div>
      <OrderModal
        title={currentOrder ? "Edit Order" : "Add Order"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        order={currentOrder}
      />
    </div>
  );
};

export default AdminOrder;
