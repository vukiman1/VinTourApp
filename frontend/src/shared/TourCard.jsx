import React from 'react';
import { Card, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from "../utils/avgRating";
const TourCard = ({tour}) => {

    const {id, title, city, photo, price, featured, reviews} = tour

    const {totalRating, avgRating} = calculateAvgRating(reviews)
   
  return <div className="tour_card">
    <Card className='tour-card'>
        <div className="tour_img">
            <img src={photo} alt="tour-img" />
            { featured && <span>Nổi bật</span>}
        </div>
    
        <CardBody>
        <div className="card_top d-lex align-items-center justify-content-between">
            <span className='tour_location d-flex align-items-center gap-1'>
                <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className='tour_ratting d-flex align-items-center gap-1'>
                <i className="ri-star-fill"></i> {avgRating === 0? null : avgRating} 
                {totalRating === 0? (
                    "Not Rated"
                ) :(
                <span>({reviews.length})</span>
                )}
            </span>
        </div>

        <h5 className="tour-title">
            <Link to={`/tours/${id}`} className='title'>{title}</Link>
        </h5>

        <div className="card_bottom d-flex align-items-center-between justify-content mt-3">
            <h5>{price}đ <span> /người</span></h5>
            
            <button className="btn booking_btn">
                <Link to={`/tours/${id}`}>Đặt ngay</Link>
            </button>
        </div>
        </CardBody>
    </Card>

    
  </div> 
}

export default TourCard