import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperStyles.css";
import { Pagination } from "swiper/modules";
import axios from "axios";

function SlidesPerViewAuto() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products")
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
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
        <SwiperSlide key={product._id || index}>
          <Link
            to={`/games/${product._id}`} 
            style={{ textDecoration: "none" }}
          >
            <img
              src={product.image_thumbnail}
              alt={product.title || `Product ${index + 1}`}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlidesPerViewAuto;
