import React from "react";
import { Table, Button } from "antd";
import useFetch from "./../../../hooks/useFetch";
import { BASE_URL } from "./../../../utils/config";

const TourTableComponent = (props) => {
  const { selectionType = "checkbox" } = props;

  const handleEdit = async (record) => {
    //Xử lý logic khi nhấn nút Xóa
  };

  const handleDelete = async (record) => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${record._id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      alert("Xoá thành công!");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
    console.log("Delete:", record._id);
  };

  const { data: tours } = useFetch(`${BASE_URL}/tours`);
  console.log(tours);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "City",
      dataIndex: "city",
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
          <Button className="me-2" onClick={() => handleEdit(record)}>
            Update
          </Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
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
      dataSource={tours}
    />
  );
};

export default TourTableComponent;
