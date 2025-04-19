import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SwiperAutoplayStyles.css";
import { Autoplay, Pagination } from "swiper/modules";

export default function App({ products }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={item.url_path}>
              <img
                src={item.image_thumbnail}
                alt={item.title || `Slide ${index + 1}`}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
