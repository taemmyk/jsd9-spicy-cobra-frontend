import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SwiperPerViewAutoStyles.css";
import { Pagination } from "swiper/modules";

function SlidesPerViewAuto({ products }) {
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
        {products.map((item, index) =>
          item.url_path ? (
            <SwiperSlide key={index}>
              <Link to={item.url_path} className="swiper-slide-link">
                <img
                  src={item.image_thumbnail}
                  alt={item.title || `Slide ${index + 1}`}
                />
              </Link>
            </SwiperSlide>
          ) : (
            <></>
          )
        )}
      </Swiper>
    </>
  );
}

export default SlidesPerViewAuto;