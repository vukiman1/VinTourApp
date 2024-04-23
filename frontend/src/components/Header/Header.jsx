import React from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/images/logo1.png";
import "./header.css";
const nav__links = [
  {
    path: "/home",
    display: "Trang chủ",
  },

  {
    path: "/tours",
    display: "Tours",
  },
];
const Header = () => {
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
              <Link to="/home"><img src={logo} alt="" /></Link>
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

            <div className="nav_rigth d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                <Button className="btn secondary__btn">
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/register">Đăng ký</Link>
                </Button>

                <div>
                  <span className="mobile_menu">
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
