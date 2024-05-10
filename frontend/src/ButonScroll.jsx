import React, { useState, useEffect } from "react";
import "./butonscroll.css";

const ButonScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Không có dependencies để chỉ chạy một lần khi component được tạo

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="button-scroll">
          <i className="ri-arrow-up-line" title="Lên đầu trang"></i>
        </button>
      )}
    </>
  );
};

export default ButonScroll;
