import React from "react";
import { Typography, Row, Col } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
          Giới thiệu về chúng tôi
        </Title>
      </motion.div>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={24} sm={12} md={10}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://cdn.vietnambiz.vn/2019/12/18/photo-1-1576662924387140450795.jpg"
              alt="Company"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paragraph
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                textAlign: "justify",
              }}
            >
              Chào mừng bạn đến với công ty chúng tôi. Chúng tôi là một công ty
              chuyên cung cấp dịch vụ du lịch hàng đầu với một đội ngũ nhân viên
              giàu kinh nghiệm và nhiệt huyết.
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                textAlign: "justify",
              }}
            >
              Chúng tôi cam kết mang lại cho khách hàng những trải nghiệm du
              lịch tuyệt vời nhất, từ việc lựa chọn các điểm đến hấp dẫn đến
              việc tổ chức chương trình du lịch linh hoạt và đội ngũ hướng dẫn
              chuyên nghiệp.
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                textAlign: "justify",
              }}
            >
              Với sứ mệnh làm hài lòng mọi khách hàng, chúng tôi luôn nỗ lực
              không ngừng để cải thiện dịch vụ của mình và đáp ứng mọi nhu cầu
              của quý khách.
            </Paragraph>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default About;
