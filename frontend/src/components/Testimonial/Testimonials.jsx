import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-01.webp'
import ava02 from '../../assets/images/ava-02.webp'
import ava03 from '../../assets/images/ava-03.webp'
import ava04 from '../../assets/images/ava-04.webp'
import ava05 from '../../assets/images/ava-05.webp'
import ava06 from '../../assets/images/ava-06.jpg'
const settings = 
{
    dots:true,
    infinite:true,
    autoplay:true,
    swipeToSlide:true,
    autoplaySpeed:2000,
    slidesToShow:3,
    responsive:
    [
        {
            breakpoint: 992,
            settings:
            {
                slidesToShow:2,
                slideToScroll:1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 576,
            settings:
            {
                slidesToShow:1,
                slideToScroll:1,
            },
        },
    ]
}

const Testimonials = () => {
  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p>Ứng dụng đặt tour du lịch rất thuận tiện và dễ sử dụng. Tôi đã dễ dàng tìm và đặt được tour 
            phù hợp với nhu cầu của mình chỉ trong vài phút.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">Thanh Tùng</h6>
            <p>Khách Hàng</p>
         </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3 ">
        <p>Giao diện của ứng dụng rất trực quan và thân thiện với người dùng. Tôi cảm thấy dễ dàng điều 
            hướng và tìm kiếm thông tin về các tour du lịch.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava02} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">Thanh Độ</h6>
            <p>Khách Hàng</p>
         </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3 ">
        <p>Chức năng thanh toán trên ứng dụng hoạt động một cách mượt mà và an toàn. 
            Tôi cảm thấy yên tâm khi thực hiện thanh toán cho tour của mình.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">Hieuthuhai</h6>
            <p>Khách hàng</p>
         </div>
        </div>
    </div>

    {/* ---------------------------------------------------- */}

    <div className="testimonial py-4 px-3 ">
        <p>Ứng dụng cung cấp một loạt các tour du lịch phong phú và đa dạng. 
            Tôi đã tìm thấy nhiều lựa chọn phù hợp với sở thích và ngân sách của mình.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava04} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">PewPew</h6>
            <p>Khách Hàng</p>
         </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3 ">
        <p>Dịch vụ chăm sóc khách hàng của ứng dụng rất chuyên nghiệp và nhanh nhẹn. 
            Tôi đã nhận được hỗ trợ nhanh chóng khi gặp phải vấn đề trong quá trình đặt tour.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava05} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">Lisa</h6>
            <p>Khách Hàng</p>
         </div>
        </div>
    </div>
    <div className="testimonial py-4 px-3 ">
        <p>Tính năng đánh giá và nhận xét của người dùng giúp tôi có cái nhìn tổng quan về chất lượng tour trước khi đặt. 
            Điều này giúp tôi tự tin hơn trong quyết định của mình.</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava06} className='w-25 h25 rounded-2 img' alt="" />
         <div>
            <h6 className="mb-0 mt-3">Hoàng Thùy Linh</h6>
            <p>Khách Hàng</p>
         </div>
        </div>
    </div>
    
    
  </Slider>
}

export default Testimonials