import React from "react";
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
        breakpoints={{
          0: {
            slidesPerView: 1,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
          600: {
            slidesPerView: 2,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
          960: {
            slidesPerView: 3,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="swiper-grid"
      >
        {products.map((item) => (
          <SwiperSlide key={item.product_id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
