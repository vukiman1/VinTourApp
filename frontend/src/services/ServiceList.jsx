import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
  {
    imgUrl: weatherImg,
    title: "Thời tiết",
    desc: "Chúng tôi sẽ tổng hợp thông tin thời tiết cho bạn.",
  },
  {
    imgUrl: guideImg,
    title: "Tour tốt nhất",
    desc: "Tư vấn những tour du lịch tốt nhất với mức ưu đãi hấp dẫn nhất.",
  },
  {
    imgUrl: customizationImg,
    title: "Tùy chỉnh",
    desc: "Có thể thay đổi những điều bạn chưa ưng ý để phù hợp nhất.",
  },
]

const ServiceList = () => {
  return <>
  {
    servicesData.map((item,index)=>(<Col lg='3' key={index}>
      <ServiceCard item={item}/>
    </Col>
  ))}
  </>
}

export default ServiceList