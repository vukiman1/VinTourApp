import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingOutlined,
  FundOutlined,
  
} from "@ant-design/icons";

import { Menu } from "antd";
import AdminUser from "../components/Admin/AdminUser/AdminUser";
import AdminTour from "../components/Admin/AdminTour/AdminTour";
import AdminOrder from "../components/Admin/AdminOrder/AdminOrder";
import AdminRevenue from "../components/Admin/AdminRevenue/AdminRevenue";
import HeaderComponent from "../components/Admin/AdminHeader/HeaderComponent";
import AdminHotel from "../components/Admin/AdminHotel/AdminHotel";

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
  {
    key:"5",
    icon:<MoonOutlined />,
    label:"Hotel"
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
      case "5":
        return <AdminHotel />
      default:
        return <AdminUser />;
    }
  };
  const handleOnClick = (key) => {
    setKeySelected(key);
  };

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
