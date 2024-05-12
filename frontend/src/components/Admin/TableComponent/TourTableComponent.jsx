import React from "react";
import { Table, Button } from "antd";

const TourTableComponent = (props) => {
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
      title: "Title",
      dataIndex: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
    },
    {
      title: "Price",
      dataIndex: "price",
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
      title: "John Brown",
      location: "john.brown@gmail.com",
      hotel: "New York No. 1 Lake Park",
      price: "0123456789",
      action: "online",
    },
    {
      key: "2",
      title: "Jim Green",
      location: "jim@gmail.com",
      hotel: "New York No. 1 Lake Park",
      price: "0123456789",
      action: "online",
    },
    {
      key: "3",
      title: "Joe Black",
      location: "john.brown@gmail.com",
      hotel: "New York No. 1 Lake Park",
      price: "0123456789",
      action: "online",
    },
    {
      key: "4",
      title: "Disabled User",
      location: "john.brown@gmail.com",
      hotel: "New York No. 1 Lake Park",
      price: "0123456789",
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
      disabled: record.title === "Disabled User",
      title: record.title,
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

export default TourTableComponent;
