import React from "react";
import { Col, Row } from "antd";
import { NavLink, Link } from "react-router-dom";

import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./style";
import logo1 from "../../../assets/images/logo1.png";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <div style={{}}>
            <img
              src={logo1}
              alt=""
              style={{
                maxWidth: "100px",
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
              <WrapperTextHeaderSmall>
                <Link to="/login">Đăng nhập</Link>/
                <Link to="/login">Đăng ký</Link>
              </WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
