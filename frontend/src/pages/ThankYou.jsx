import React from 'react'
import {Container, Row, Col, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/thank-you.css'

const ThankYou = () => {
  return <section>
    <Container>
        <Row>
            <Col lg='12' className='pt-5 text-center'>
                <div className="thank-you">
                    <span>
                        <i className='ri-checkbox-circle-line'>
                            <h1 className="mb-3 fw-semibolod">
                                Thank You
                            </h1>
                            <h3 className="mb-4">
                                Bạn đã đặt tour thành công
                            </h3>
                            
                            <Button className='btn primary__btn w-30'><Link to='/home'>
                                Quay trở lại trang chủ
                            </Link></Button>
                        </i>
                    </span>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default ThankYou