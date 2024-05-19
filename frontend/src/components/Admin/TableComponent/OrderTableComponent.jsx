import { Table, Button, message, Popconfirm } from "antd";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const OrderTableComponent = ({ onEdit, onDelete }) => {
  const { data: orders } = useFetch(`${BASE_URL}/booking`);

  const handleEdit = (record) => {
    onEdit(record);
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${record._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        message.success("Order deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
      //message.error("An error occurred while deleting the order");
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Tour",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <>
          {record.status === "Pending" && (
            <>
              <span style={{ color: "blue" }}>Pending</span>
            </>
          )}
          {record.status === "Confirmed" && (
            <span style={{ color: "green" }}>Confirmed</span>
          )}
        </>
      ),
    },
    {
      title: "People",
      dataIndex: "guestSize",
      key: "guestSize",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger className="ms-1">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={orders} columns={columns} rowKey="_id" />;
};

export default OrderTableComponent;
