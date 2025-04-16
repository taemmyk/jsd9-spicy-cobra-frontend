import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductSwiperStyles.css";

import { Navigation, Thumbs } from "swiper/modules";

function ProductSwiper({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        modules={[Navigation, Thumbs]}
        style={{
          "--swiper-navigation-color": "#D1B6FF",
          "--swiper-pagination-color": "#D1B6FF",
          borderRadius: 8,
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`nature ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        style={{
          borderRadius: 8,
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  );
}

export default ProductSwiper;
