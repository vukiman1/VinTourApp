import React from "react";
import "./HotelModal.css"
import { Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";

const HotelModal = ({ isOpen, toggle, hotelInfo }) => {

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">&#9733;</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="modal-title">
        <ModalHeader toggle={toggle}> <p>Khách sạn {hotelInfo?.name}</p></ModalHeader>
      </div>
     
      <ModalBody>

        <div>
          <img  className="img-hotel  max-w-lg rounded-lg" src={`${hotelInfo?.image}`} alt={hotelInfo?.name} />
          <div className="star-rating">
            <h3>Thông tin khách sạn</h3>
          </div>
          </div>
      </ModalBody>
        <ModalFooter>
          <div className="body-info bg-light">
            <div>
            <strong>Đánh giá: </strong>{renderStars(hotelInfo?.rating)}
            </div>
            <p><strong>Địa chỉ:</strong> {hotelInfo?.address}</p>
          </div>
        </ModalFooter>
        
       
    </Modal>
  );
};

export default HotelModal;
