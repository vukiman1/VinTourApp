import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/anhhanoi.jpg";
import heroImg02 from "../assets/images/caubantay.jpg";
import heroVideo from "../assets/images/mucangchai.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "../shared/Subtitle";

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeatureTourList from "../components/Featured-tours/FeatureTourList";
import MasonryImagesGallery from "../components/Imagae-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";
import ButonScroll from "../ButonScroll"
  
const Home = () => {
  {window.scrollTo({ top: 0, behavior: 'smooth' })}

  return (
    <>
      {/* ============= hero section start ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Có thể bạn không biết"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Du lịch là một cách để tạo cho chúng ta{""}
                  <span className="highlight">{""} KỶ NIỆM</span>
                </h1>
                <p>
                  Chúng tôi tự hào mang đến cho các bạn một trải nghiệm du lịch
                  một cách tuyệt vời nhất.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ============= hero section start ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services_subtitle">Những gì chúng tôi phục vụ</h5>
              <h2 className="services_title">Tự hào cung cấp điều tốt nhất</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ================ feature tour strat ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Khám phá"} />
              <h2 className="featured_tour-title">Tour du lịch nổi bật </h2>
            </Col>
            <FeatureTourList />
          </Row>
        </Container>
      </section>
      {/* ================ feature tour end ============ */}
      {/* ================ experience section strat ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Kinh nghiệm"} />

                <h2>
                  Với tất cả kinh nghiệm <br /> chúng tôi sẽ phục vụ bạn{" "}
                </h2>
                <p>
                  Tự hào là nơi tổ chức những tour du lịch hàng đầu Việt Nam.
                  <br />
                  Với nhiều năm kinh nghiệm trong ngành du lịch Việt, cùng với
                  đó là có lượng khách hàng thân thiết vô cùng lớn.
                </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12k+</span>
                  <h6>Chuyến đi</h6>
                </div>
                <div className="counter_box">
                  <span>2k+</span>
                  <h6>Khách hàng thân thiết</h6>
                </div>
                <div className="counter_box">
                  <span>15+</span>
                  <h6>Năm kinh nghiệm</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience_image">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================ experience section end ============ */}

      {/* ================ gallery section start ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Bộ sưu tập"} />
              <h2 className="gallery_title">
                Đón xem những bộ ảnh du lịch của khách hàng chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================ gallery section end ============ */}

      {/* ================ testimonial section start ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Góc feedback"} />
              <h2 className="testimonia_title">
                Những điều họ nói về chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================ testimonial section end ============ */}
      <Newsletter></Newsletter>
      <ButonScroll></ButonScroll>
    </>
    
  );
};

export default Home;
