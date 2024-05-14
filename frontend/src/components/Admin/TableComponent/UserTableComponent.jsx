import { Table, Button, Popconfirm } from "antd";
import React from "react";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const UserTableComponent = ({ onEdit, onDelete }) => {
  const { data: users, refetch } = useFetch(`${BASE_URL}/users`);

  const handleEdit = (record) => {
    onEdit(record); // Pass selected user data to the modal
  };

  const handleDelete = async (record) => {
    await onDelete(record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="ms-2">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};

export default UserTableComponent;
