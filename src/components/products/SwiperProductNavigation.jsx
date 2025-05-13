import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../common/swiperStyles.css";
import { Navigation } from "swiper/modules";

function SwiperProductNavigation({ product }) {
  const imagesToShow = [
    product.imageThumbnail,
  ...(product.imageSlideshow || []),
  ].filter(Boolean);

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="swiper-product">
        {imagesToShow.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`${product.title} ${index + 1}`} loading="lazy"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperProductNavigation;
