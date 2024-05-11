import React from "react";
import { WrapperHeader } from "../AdminUser/style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TourTableComponent from "../TableComponent/TourTableComponent";

const AdminOrder = () => {
  return (
    <div style={{ marginLeft: "40px" }}>
      <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
      <div style={{ marginTop: " 10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TourTableComponent />
      </div>
    </div>
  );
};

export default AdminOrder;
