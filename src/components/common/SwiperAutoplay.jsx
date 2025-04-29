import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperStyles.css";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products"); 
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
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
      {products.map((product, index) => (
        <SwiperSlide key={product._id || index}>
          <Link to={`/games/${product._id}`}>
            <img
              src={product.image_thumbnail}
              alt={product.title || `Slide ${index + 1}`}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
