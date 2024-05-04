import React from "react";
import { Table } from "antd";
const TableComponent = (props) => {
  const { selectionType = "checkbox" } = props;
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

  // rowSelection object indicates the need for row selection
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
      // Column configuration not to be checked
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

export default TableComponent;
