// export default UserTableComponent;
import { Table, Button } from "antd";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const UserTableComponent = ({ onEdit }) => {
  // const [users, setUsers] = useState([]);

  const { data: users } = useFetch(`${BASE_URL}/users`);
  const fetchData = () => {
    return users;
  };
  useEffect(() => {
    fetchData();
  }, []); // Chỉ chạy một lần khi component mount

  console.log(users);

  // handle
  const handleEdit = async (record) => {
    //Xử lý logic khi nhấn nút Xóa
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
        <Button onClick={() => onEdit(record)}>Update</Button>
      ),
    },
  ];
  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};

export default UserTableComponent;
