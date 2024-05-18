import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../styles/login.css";
import usericon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
  window.scrollTo({ top: 130, behavior: "smooth" });

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.email || !credentials.password) {
      return openNotificationWithIcon(
        "warning",
        "Warning",
        "Please fill in all fields"
      );
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      dispatch({ type: "REGISTER_SUCCESS", payload: result });
      openNotificationWithIcon(
        "success",
        "Success",
        "Account created successfully"
      );
      navigate("/login");
    } catch (error) {
      openNotificationWithIcon("error", "Error", `Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="full">
        <Container>
          <Row>
            <Col lg="5" className="m-auto">
              <div className="login_container d-flex justify-content-between">
                <div className="login_form">
                  <div className="user">
                    <img src={usericon} alt="User Icon" />
                  </div>
                  <h2>Đăng kí</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Tên người dùng"
                        required
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth_btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Đăng ký"}
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

export default Register;
