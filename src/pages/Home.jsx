import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";

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
      <SwiperPerViewAuto products={recommendedGames} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          gap: 2,
          paddingY: 2,
        }}
      >
        <Paper elevation={3} />
        <Heading section="For you" />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: {
              xs: 2,
              md: 4,
            },
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          {products.map((game, index) => (
            <ProductCard key={index} product={game} />
          ))}
        </Box>
      </Box>

      <SwiperAutoplay products={recommendedGames} />
    </>
  );
};

export default Home;
