import { Table, Button } from "antd";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const UserTableComponent = ({ onEdit }) => {
  const { data: users, refetch } = useFetch(`${BASE_URL}/users`);

  const handleEdit = async (record) => {
    onEdit(record); // Pass selected user data to the modal
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
        <Button onClick={() => handleEdit(record)}>Update</Button>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};

export default UserTableComponent;
