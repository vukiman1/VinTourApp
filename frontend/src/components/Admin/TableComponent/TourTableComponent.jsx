import { Table, Button, Popconfirm } from "antd";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";

const TourTableComponent = ({ onEdit, onDelete }) => {
  const { data: tours } = useFetch(`${BASE_URL}/tours`);

  const handleEdit = (record) => {
    onEdit(record);
  };

  const handleDelete = async (record) => {
    await onDelete(record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete this tour?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="ms-1">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={tours} columns={columns} rowKey="_id" />;
};

export default TourTableComponent;
