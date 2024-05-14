import { Table, Button, Popconfirm } from "antd";
import React from "react";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const UserTableComponent = ({ onEdit, onDelete }) => {
  const { data: users, refetch } = useFetch(`${BASE_URL}/users`);

  const handleEdit = (record) => {
    onEdit(record); // Pass selected user data to the modal
  };

  const handleDelete = (record) => {
    onDelete(record); // Call the delete function passed as prop
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: "8px" }} danger>
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
