import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { useParams, Link } from "react-router-dom";
import qr from '../assets/images/qr.jpg'
import "../styles/payment.css"
const Payment = () => {
  const { id } = useParams();
  return (
    <Container>
      <Row>
        <Col lg='6'>
          <div className="qrPicture ">
            <img src={qr} alt="" />
          </div>
        </Col>
        <Col lg='6' className='mt-5'>
          <h2>Vui lòng quét mã QR để thanh toán</h2>
          <p className='pa'>Nội dung chuyển khoản: </p>
          <p className='pa'><strong>Số tiền: </strong> </p>
          <div className="button">
          <button className='btn primary__btn ms-2 '>
            <Link to={`/tours/${id}`}>Quay lại</Link>
          </button>
          <button className='btn primary__btn ms-2 '>
            <Link to='/thank-you'>Xong</Link>
          </button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Payment