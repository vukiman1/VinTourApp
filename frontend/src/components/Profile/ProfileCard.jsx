import React, { useContext } from "react";
import { Card, Typography, Row, Col } from "antd";
import ava from "../../assets/images/user.png";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import "./ProfileCard.css"; // Import CSS file
import { AuthContext } from "../../context/AuthContext";

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfileCard = (data) => {
  const { role } = useContext(AuthContext);
  return (
    <div className="profile-container">
      <Card
        hoverable
        className="profile-card"
        cover={
          <div className="avatar-container">
            <img src={ava} alt="" />
          </div>
        }
      >
        <Meta
          title={
            <Title level={3} className="profile-title">
              {data.user.username}
            </Title>
          }
        />
        <div className="info-container">
          <Title level={4} className="info-title">
            Thông tin chi tiết
          </Title>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <PhoneOutlined /> Điện thoại:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{data.user.phone} </Text>
              <i className="ms-2 ri-edit-line"></i>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <MailOutlined /> Email:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{data.user.email} </Text> <span></span>
              <i className="ms-2 ri-edit-line"></i>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <EnvironmentOutlined /> Địa chỉ:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{data.user.address} </Text>
              <i className=" ms-2 ri-edit-line"></i>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <UserSwitchOutlined /> Role:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{role} </Text>
              <i className="ms-2 ri-edit-line"></i>
            </Col>
          </Row>
        </div>
        <div></div>
      </Card>
    </div>
  );
};

export default ProfileCard;
