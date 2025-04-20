import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";

import products from "../data/products.json";
const Home = () => {
  const recommendedGames = products.slice(0, 5);
  return (
    <>
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
