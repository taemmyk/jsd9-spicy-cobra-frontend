import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperStyles.css";
import { Pagination } from "swiper/modules";

function SwiperSlideshow({ images }) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ display: 'block', width: '100%', height: 'auto' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperSlideshow;
