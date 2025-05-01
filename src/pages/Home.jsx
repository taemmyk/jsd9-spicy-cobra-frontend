import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";
import SwiperGrid from "../components/common/SwiperGrid";

import products from "../data/products.json";
// import { getProducts } from "../api/products";

const Home = () => {
  const recommendedGames = products.slice(0, 5);
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getProducts();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.contrastText,
          gap: 2,
          paddingY: 2,
        }}
      >
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              {product.product_id} - {product.title} - Price: {product.price} - Genre {product.genre_id}
            </li>
          ))}
        </ul>
      </Box> */}
      <Box sx={{ paddingBottom: 2 }}>
        <SwiperPerViewAuto products={recommendedGames} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 2,
        }}
      >
        <Paper elevation={3} />
        <Heading section="For you" />
        <Box sx={{ marginLeft: 4, marginRight: 4 }}>
          <SwiperGrid products={products} />
        </Box>
      </Box>
      <Box sx={{ paddingBottom: 2 }}>
        <Heading section="New Release" />
        <SwiperAutoplay products={recommendedGames} />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 2,
        }}
      >
        <Paper elevation={3} />
        <Heading section="News" />
      </Box>
    </>
  );
};

export default Home;
