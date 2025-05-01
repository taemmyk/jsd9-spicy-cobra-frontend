import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";
import SwiperGrid from "../components/common/SwiperGrid";

import products from "../data/products.json";

const Home = () => {
  const recommendedGames = products.slice(0, 5);

  return (
    <>
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
