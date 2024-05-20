import { React, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import logo from "../../assets/images/logo1.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext";

const nav__links = [
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
const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const toggleUserMenu = () => {
    const userMenu = document.getElementById("user-menu");
    userMenu.classList.toggle("show");
  };
  const NottoggleUserMenu = () => {
    const userMenu = document.getElementById("user-menu");
    userMenu.classList.toggle("hidden");
  };

  return (
    <header className="header">
      <Container>
        <Row>
          <div
            className="nav_wrapper d-flex align-intems-center 
      justify-content-between"
          >
            {/* ============ logo =============  */}
            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="" />
              </Link>
            </div>
            {/* ============ logo end =============  */}
            {/* ============ menu start=============  */}
            <div className="navifation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ============ menu end =============  */}

            <div className="nav_btns d-flex align-items-center gap-4">
              {user ? (
                <>
                  <div
                    className="menu-container"
                    style={{ position: "relative", cursor: "pointer" }}
                  >
                    <div
                      className="mb-0"
                      id="user-menu-trigger"
                      onMouseEnter={toggleUserMenu}
                      onMouseLeave={NottoggleUserMenu}
                    >
                      <UserOutlined
                        style={{ fontSize: "25px", marginRight: "6px" }}
                      />
                      <b>{`${user.username}`}</b>
                      {`  (${role})`}
                    </div>
                    <div>
                      <ul className="dropdown-menu menu-size " id="user-menu">
                        <li>
                          <Link to="/profile">Hồ sơ</Link>
                        </li>
                        <li>
                          <Link to={`/history/${user._id}`}>Lịch sử tour</Link>
                        </li>

                        {role === "admin" && (
                          <li>
                            <Link to="/admin">Quản trị hệ thống</Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="btn-logout-container">
                    <Button
                      className="btn btn-dark btn-logout"
                      onClick={() => logout()}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Đăng nhập</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Đăng ký</Link>
                  </Button>
                </>
              )}
              <div>
                <span className="mobile_menu">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
