import React, { useState } from "react";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";

import LoginImg from "../assets/images/dulichviet.jpeg";
import usericon from "../assets/images/user.png";

const Login = () => {
  window.scrollTo({ top: 130, behavior: 'smooth' })
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="full">
        <Container>
          <Row>
            <Col lg="5" className="m-auto">
              <div className="login_container d-fex justify-content-between">
                <div className="login_form">
                  <div className="user">
                    <img src={usericon} alt="" />
                  </div>
                  <h2>Đăng nhập</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth_btn"
                      type="submit"
                    >
                      Đăng nhập
                    </Button>
                  </Form>
                  <p>
                    Chưa có tài khoản? <Link to="/register">Tạo mới</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Login;
