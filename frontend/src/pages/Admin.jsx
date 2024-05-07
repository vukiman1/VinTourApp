import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingOutlined,
  FundOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import AdminUser from "../components/Admin/AdminUser/AdminUser";
import AdminTour from "../components/Admin/AdminTour/AdminTour";
import AdminOrder from "../components/Admin/AdminOrder/AdminOrder";
import AdminRevenue from "../components/Admin/AdminRevenue/AdminRevenue";
import HeaderComponent from "../components/Admin/AdminHeader/HeaderComponent";

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Người dùng",
  },

  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Tour",
  },

  {
    key: "3",
    icon: <ShoppingOutlined />,
    label: "Đơn hàng",
  },

  {
    key: "4",
    icon: <FundOutlined />,
    label: "Doanh thu",
  },
];

const Admin = () => {
  const [keySelected, setKeySelected] = useState("");
  const renderPage = ({ key }) => {
    switch (key) {
      case "1":
        return <AdminUser />;
      case "2":
        return <AdminTour />;
      case "3":
        return <AdminOrder />;
      case "4":
        return <AdminRevenue />;
      default:
        return <div> nothing</div>;
    }
  };
  const handleOnClick = (key) => {
    setKeySelected(key);
  };
  console.log("keySelected", keySelected);
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["231"]}
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1 }}>{renderPage(keySelected)}</div>
      </div>
    </div>
  );
};
export default Admin;