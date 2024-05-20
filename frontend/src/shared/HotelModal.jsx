import React from "react";
import "./HotelModal.css"
import { Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";


const HotelModal = ({ isOpen, toggle, hotelInfo }) => {

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;

    let partialStar = '';
    if (decimal >= 0.75) {
      partialStar = 'three-quarter';
    } else if (decimal >= 0.5) {
      partialStar = 'half';
    } else if (decimal >= 0.25) {
      partialStar = 'one-quarter';
    } else if (decimal > 0) {
      partialStar = 'under-quarter';
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">&#9733;</span>);
      } else if (i === fullStars + 1 && partialStar) {
        stars.push(<span key={i} className={`star ${partialStar}`}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9733;</span>);
      }
    }
    return stars;
  };
  const renderAmenities = (amenities) => {
    return amenities.map((amenity, index) => (
      <div key={index} className="amenity">
        <img src={amenity.icon} alt={amenity.name} className="amenity-icon" />
        <span>{amenity.name}</span>
      </div>
    ));
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
            <div className="bodycontent">
            <strong>Đánh giá: </strong>{renderStars(hotelInfo?.rating)}
            </div>
            <div>
            <p className="bodycontent"><strong>Địa chỉ:</strong> {hotelInfo?.address}</p>
            </div>
            <div className="bodycontent">
              {hotelInfo?.amenities ? renderAmenities(hotelInfo.amenities) : <p>Không có tiện ích nào</p>}
            </div>
          </div>
        </ModalFooter>
        </Modal>
          
   
  );
};

export default HotelModal;
