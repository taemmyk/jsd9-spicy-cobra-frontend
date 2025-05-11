import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../common/swiperStyles.css";
import { Navigation } from "swiper/modules";

function SwiperproductsNavigation({ products }) {
  const imagesToShow = [
    products.image_thumbnail,
    products.image_show_1,
    products.image_show_2,
    products.image_show_3,
  ].filter(Boolean);

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="swiper-products">
        {imagesToShow.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`${products.title} ${index + 1}`} loading="lazy"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperproductsNavigation;
