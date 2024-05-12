import React from "react";
import { Table, Button } from "antd";

const UserTableComponent = (props) => {
  const { selectionType = "checkbox" } = props;

  const handleEdit = (record) => {
    // Xử lý logic khi nhấn nút Sửa
    console.log("Edit:", record);
  };

  const handleDelete = (record) => {
    // Xử lý logic khi nhấn nút Xóa
    console.log("Delete:", record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <span>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      address: "New York No. 1 Lake Park",
      phone: "0123456789",
      action: "online",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jim@gmail.com",
      address: "New York No. 1 Lake Park",
      phone: "0123456789",
      action: "online",
    },
    {
      key: "3",
      name: "Joe Black",
      email: "john.brown@gmail.com",
      address: "New York No. 1 Lake Park",
      phone: "0123456789",
      action: "online",
    },
    {
      key: "4",
      name: "Disabled User",
      email: "john.brown@gmail.com",
      address: "New York No. 1 Lake Park",
      phone: "0123456789",
      action: "online",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default UserTableComponent;
