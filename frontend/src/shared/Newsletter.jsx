import React from 'react'
import './newletter.css'

import { Container,Row,Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
const Newsletter = () => {
  return <section className='newsletter'>
    <Container>
        <Row>
            <Col lg='12'>
              <div className="newsletter_content">
                <h2>Để lại email để nhận được thông báo</h2>
            
                <div className="newsletter_input">
                    <input type="email" placeholder='Hãy điền email của bạn' />
                    <button className='btn newsletter_btn'>Gửi</button>
                </div>
                <p>Chúng tôi cam kết gửi email đến địa chỉ của bạn một cách đáng tin cậy, 
                  đảm bảo không có tin nhắn "rác", để thông báo về các tour du lịch có <b>ưu đãi</b> tốt và cơ hội hấp dẫn khác.</p>            
            </div>  
            </Col>
            {/* <Col lg='6'>
                <div className="newsletter_img">
                    <img src={maleTourist} alt="" />
                </div>
            </Col> */}
        </Row>
    </Container>
  </section>
}

export default Newsletter