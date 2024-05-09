import { React, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

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
];
const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
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

            <div className="nav_rigth d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Đăng xuất
                    </Button>
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
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
