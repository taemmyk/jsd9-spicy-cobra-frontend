import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./swiperStyles.css";

import { Grid, Pagination } from "swiper/modules";

import ProductCard from "../products/ProductCard";

export default function App({ products }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="swiper-grid"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={`/games/${item.product_id}`}>
              {/* <img
                src={item.image_thumbnail}
                alt={item.title || `Slide ${index + 1}`}
              /> */}
              <ProductCard product={item}/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
