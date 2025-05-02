import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperStyles.css";
import { Autoplay, Pagination } from "swiper/modules";
import banners from "../../assets/game-banner-bounty-brawl.jpg";

export default function App() {
  const numberOfSlides = 3; //TODO: Repeated slide

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
        className="swiper-autoplay"
      >
        {Array.from({ length: numberOfSlides }).map((_, index) => (
          <SwiperSlide key={index}>
            <Link to={`/games/6`}>
              <img src={banners} alt="Bounty Brawl: Most Wanted" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
