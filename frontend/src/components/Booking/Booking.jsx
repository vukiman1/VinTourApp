import React, { useState } from "react";
import "./booking.css";
import formatPrice from "../../hooks/formatPrice";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "01",
    userEmail: "abc@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookat: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // const priceNumber = parseFloat(price.replace(/\./g, ''));
  const totalAmount = price * Number(credentials.guestSize);
  const totalAmountvnd = totalAmount.toLocaleString("vi-VN");

  // send data to sever
  const handleClick = (e) => {
    e.preventDefault();

    navigate("/thank-you");
  };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          {formatPrice(price)} vnđ <span>/người</span>
        </h3>
        <span className="tour_ratting d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ========= booking form ============= */}
      <div className="booking_form">
        <h5> Thông Tin </h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Họ và Tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Số điện thoại"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=" "
              id="bookat"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Số khách hàng"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ========= booking form end ============= */}

      {/* ============booking bottom============= */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {formatPrice(price)}vnđ <i className="ri-close-line"></i>1 người
            </h5>
            <span>{formatPrice(formatPrice(price))} vnđ</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Tổng</h5>
            <span>{totalAmountvnd} vnđ</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          {" "}
          Đặt ngay
        </Button>
      </div>

      {/* ============booking bottom end ============= */}
    </div>
  );
};

export default Booking;
