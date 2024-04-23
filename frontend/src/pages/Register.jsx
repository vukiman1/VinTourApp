import React, { useState } from "react";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";

// import registerImg from "../assets/images/register.png";
import usericon from "../assets/images/user.png";

const Reagister = () => {
  window.scrollTo({ top: 130, behavior: 'smooth' })
  const [credentials, setCredentials] = useState({
    userNname: undefined,
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
                  <h2>Đăng kí</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        required
                        id="username"
                        onChange={handleChange}
                      />
                    </FormGroup>
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
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth_btn"
                      type="submit"
                    >
                      Đăng ký
                    </Button>
                  </Form>
                  <p>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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

export default Reagister;
