import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperStyles.css";
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
        className="swiper-recommended"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`/games/${product.slug}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={product.imageThumbnail}
                alt={product.title || `Product ${index + 1}`}
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SlidesPerViewAuto;
