import React, { useRef, useState, useContext, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

import formatPrice from "../hooks/formatPrice";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

import { AuthContext } from "../context/AuthContext";
import Subtitle from "../shared/Subtitle";
import FeatureTourList from "../components/Featured-tours/FeatureTourList";

import HotelModal from "../shared/HotelModal";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

  // call API va load Data tu database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    hotel,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // gui request den sever
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (reviewText === "") {
      return alert(`Chưa nhập nội dung!`);
    }
    try {
      if (!user || user === undefined || user === null) {
        alert("Vui lòng đăng nhập để bình luận!");
        return navigate("/login");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: selectedRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  //Hotel
  const [hotels, setHotels] = useState([]);
  const [selectedHotelInfo, setSelectedHotelInfo] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleHotelHover = (hotelName) => {
    const seletedHotel = hotels.find((hotel) => hotel.name === hotelName);
    setSelectedHotelInfo(seletedHotel);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    if (tour) {
      const { title } = tour;
      const fetchHotels = async () => {
        try {
          const response = await fetch(`${BASE_URL}/hotel/tour/${title}`);
          const data = await response.json();
          if (response.ok) {
            setHotels(data.data);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      };

      fetchHotels();
    }
  }, [id, tour]);

  const renderHotels = () => {
    return (
      <div className="select-hotel">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="hotel-option"
            onMouseEnter={() => handleHotelHover(hotel.name)}
          >
            {hotel.name}
          </div>
        ))}
        {isHovered && (
          <HotelModal
            isOpen={isHovered}
            toggle={() => setIsHovered(false)}
            hotelInfo={selectedHotelInfo}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <section>
        <Container>
          {loading && (
            <h4>
              <Spin className="text-center" tip="Loading" size="large"></Spin>
            </h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt="" />

                  <div className="tour_infor">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour_ratting d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-time-line"></i> {address}
                      </span>
                    </div>
                    <div className="tour_extra-detail">
                      <span>
                        <i className="ri-map-pin-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>{" "}
                        {formatPrice(price)}đ
                      </span>
                      <span>
                        <i className="ri-hotel-line"></i> {hotel}
                        <div onMouseLeave={handleMouseLeave}>
                          {renderHotels()}
                        </div>
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} người
                      </span>
                    </div>
                    <h5>Mô tả</h5>
                    {desc.map((day, index) => (
                      <div key={index}>
                        <h5>{day.day} :</h5>
                        {day.activities.map((activity, i) => (
                          <p key={i}>{activity}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* tour reviews section */}
                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="rating_group d-flex align-items-center gap-3 mb-4">
                        {[...Array(5)].map((_, i) => {  
                          const ratingValue = i + 1;
                          return (
                            <span
                              key={ratingValue}
                              onClick={() => setSelectedRating(ratingValue)}
                              onMouseEnter={() => setHoverRating(ratingValue)}
                              onMouseLeave={() => setHoverRating(0)}
                              style={{
                                cursor: 'pointer',
                                color: ratingValue <= (hoverRating || selectedRating)
                                  ? secondaryColor
                                  : '#e4e5e9',
                                fontSize: '24px',
                              }}
                            >
                              <i className="ri-star-s-fill"></i>
                            </span>
                          );
                        })}
                      </div>

                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Chia sẻ của bạn"
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user_reviews">
                      {reviews?.map((review) => (
                        <div className="review_item" key={review._id}>
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US")}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}{" "}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* tour reviews section end */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Gợi ý"} />
              <h2 className="featured_tour-title">Có thể bạn muốn đi:</h2>
            </Col>
            <FeatureTourList />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
