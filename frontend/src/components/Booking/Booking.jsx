import React, { useState, useContext } from "react";
import "./booking.css";
import formatPrice from "../../hooks/formatPrice";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { notification } from "antd";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title, _id } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    tourId: _id,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    price: price,
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = price * Number(booking.guestSize);

  const handleClick = async (e) => {
    e.preventDefault();
    booking.price = totalAmount;
    try {
      if (!user) {
        notification.warning({ message: "Please sign in" });
        return navigate("/login");
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });
      const result = await res.json();

      if (!res.ok) {
        return notification.error({ message: result.message });
      }
      navigate(`/tours/payment/${_id}`);
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          {formatPrice(price)} vnđ <span>/người</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

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
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Số khách hàng"
              id="guestSize"
              min={1}
              defaultValue={1}
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {formatPrice(price)}vnđ <i className="ri-close-line"></i>1 người
            </h5>
            <span>{formatPrice(price)} vnđ</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Tổng</h5>
            <span>{formatPrice(totalAmount)} vnđ</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Đặt ngay
        </Button>
      </div>
    </div>
  );
};

export default Booking;
