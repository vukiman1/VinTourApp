import React, { useContext } from "react";
import { Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./headerComponent.css";
import { Dropdown, Space } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./style";
import logo1 from "../../../assets/images/logo0.png";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: <Link to="/home">Trang chủ</Link>,
    },
    {
      key: "2",
      danger: true,
      label: (
        <Link to="/login" onClick={logout}>
          Đăng xuất
        </Link>
      ),
    },
  ];

  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <div style={{}}>
            <img
              src={logo1}
              alt=""
              style={{
                maxWidth: "50px",
                height: "auto",
              }}
            />
          </div>
        </Col>
        <Col span={12}></Col>
        <Col span={6} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px", color: "#fff" }} />

            <div>
              <WrapperTextHeaderSmall>{user.username}</WrapperTextHeaderSmall>
              <div className="dropdow-menu">
                <Dropdown menu={{ items }}>
                  <Space>
                    <WrapperTextHeaderSmall>
                      {role === "admin" ? "Adminstrator" : "unknown"}
                    </WrapperTextHeaderSmall>
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </div>
            </div>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
