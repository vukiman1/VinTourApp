import React,{useRef, useState} from 'react'
import '../styles/tour-details.css'
import {Container,Row,Col,Form,ListGroup} from 'reactstrap'
import {useParams} from 'react-router-dom'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from "../assets/images/avatar.jpg"
import Booking from '../components/Booking/Booking'

const TourDetails = () => {

  window.scrollTo({ top: 0, behavior: 'smooth' })
  const {id} = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating]= useState(null)


  // call API va load Data tu database
  const tour = tourData.find(tour=>tour.id === id)

  // destructue properties from tour object
  const {photo,title, desc, price, address, reviews, city,
    hotel, maxGroupSize} = tour
  
  const {totalRating, avgRating} = calculateAvgRating(reviews)
  
  // gui request den sever
  const submitHandler = e=>
  {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value
  }

  return <>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className="tour_content">
              <img src={photo} alt="" />

              <div className="tour_infor">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className='tour_ratting d-flex align-items-center gap-1'>
                    <i className="ri-star-fill" style=
                    {{color: "var(--secondary-color)"}}></i> 
                    {avgRating === 0? null : avgRating} 
                      {totalRating === 0? (
                          "Not Rated"
                      ) :(
                      <span>({reviews?.length})</span>
                      )}
                  </span>
                      <span>
                          <i className="ri-map-pin-fill"></i> {address} 
                      </span>
                </div>
                <div className="tour_extra-detail">
                  <span>
                  <i class="ri-map-pin-line"></i> {city}
                  </span>
                  <span>
                  <i class="ri-money-dollar-circle-line"></i> {price}đ
                  </span>
                  <span>
                  <i class="ri-hotel-line"></i> {hotel} 
                  </span>
                  <span>
                  <i class="ri-group-line"></i> {maxGroupSize} nguười
                  </span>
                </div>
                <h5>Mô tả</h5>
                <p>{desc}</p>
              </div>
              {/* tour reivews section */}
              <div className="tour_reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>
                <Form onSubmit={submitHandler}>
                  <div className=" rating_group d-flex 
                  align-items-center gap-3 mb-4 ">
                    <span onClick={()=> setTourRating(1)}>
                      1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setTourRating(2)}>
                      2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setTourRating(3)}>
                      3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setTourRating(4)}>
                      4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setTourRating(5)}>
                      5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                    
                    <div className="review_input">
                      <input type="text" ref={reviewMsgRef} placeholder='Chia sẻ của bạn' />
                      <button className='btn primary__btn text-white' type='submit'>
                        Submit
                      </button>
                    </div>
                </Form>
                  
                <ListGroup className='user_reviews'>
                  {
                    reviews?.map(review => (
                      <div className="review_item">
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className='d-flex align-items-center justify-content-between'>
                            <div>
                              <h5>Nguyễn Thành Công</h5>
                              <p>
                                {
                                  new Date("01-18-2023").toLocaleDateString("en-US")
                                }
                              </p>
                            </div>
                            <span className='d-flex align-items-center'>
                                5 <i className="ri-star-s-fill"></i>
                            </span>

                          </div>
                          <h6>Một trải nghiệm tour tuyệt vời!!</h6>
                          </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
              {/* tour reivews section end*/}

            </div>
          </Col>
          <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating}/>
          </Col>
        </Row>
      </Container>
    </section>
  </>
}

export default TourDetails