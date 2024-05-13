import React from "react";
import "./footer.css";

import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/logo1.png";

const quick__links = [
  {
    path: "/home",
    display: "Trang chủ",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/about",
    display: "Giới thiệu",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Bộ sưu tập",
  },
  {
    path: "/login",
    display: "Đăng nhập",
  },
  {
    path: "/register",
    display: "Đăng ký",
  },
];
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>
                Chào mừng bạn đến với Vintour - nơi bạn khám phá thế giới một
                cách đầy đam mê và chuyên nghiệp. Với tinh thần mở cửa cảm xúc,
                chúng tôi cam kết mang đến cho bạn những trải nghiệm du lịch độc
                đáo và không quên. Hãy cùng chúng tôi khám phá những chuyến hành
                trình tuyệt vời và đắm chìm trong những kỷ niệm đáng nhớ trên
                khắp Việt Nam.
              </p>

              <div className="social_links d-flex align-item-center gap-4">
                <span>
                  <Link to="#">
                    {" "}
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    {" "}
                    <i className="ri-github-fill"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    {" "}
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    {" "}
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Khám phá</h5>
            <ListGroup className="footer_quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Phím tắt</h5>
            <ListGroup className="footer_quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Liên hệ</h5>
            <ListGroup className="footer_quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-cente gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0"> Hanoi, VietNam</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-cente gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">hotro.vintour@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-cente gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Phone number:
                </h6>
                <p className="mb-0">+84 3320 44444</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12">
            <p className="text-center copyright">Copyrigt 2024 by Vintour</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
