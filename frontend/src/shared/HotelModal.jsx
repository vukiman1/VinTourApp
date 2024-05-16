import React from "react";
import "./HotelModal.css"
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const HotelModal = ({ isOpen, toggle, hotelInfo }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{hotelInfo?.name}</ModalHeader>
      <ModalBody>
        <img src={`${hotelInfo?.image}`} alt={hotelInfo?.name} />
        <p><strong>Địa chỉ:</strong> {hotelInfo?.address}</p>
        <p><strong>Đánh giá:</strong> {hotelInfo?.rating}</p>
      </ModalBody>
    </Modal>
  );
};

export default HotelModal;
