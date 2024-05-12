import React from "react";
import { Avatar, Card, Typography, Row, Col } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./ProfileCard.css"; // Import CSS file

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfileCard = (data) => {
  return (
    <div className="profile-container">
      <Card
        hoverable
        className="profile-card"
        cover={
          <div className="avatar-container">
            <Avatar size={100} icon={<UserOutlined />} className="avatar" />
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
              <Text>Chưa có</Text>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <MailOutlined /> Email:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{data.user.email}</Text>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <EnvironmentOutlined /> Địa chỉ:
              </Text>
            </Col>
            <Col span={16}>
              <Text>Chưa có</Text>
            </Col>
          </Row>
          <Row className="info-row" gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <CalendarOutlined /> Ngày sinh:
              </Text>
            </Col>
            <Col span={16}>
              <Text>Chưa có</Text>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
