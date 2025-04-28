import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";
import axios from "axios";

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProductsData(res.data);
        setError("");
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const recommendedGames = productsData.slice(0, 5);

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

        {loading ? (
          <Typography sx={{ textAlign: "center", mt: 4 }}>Loading...</Typography>
        ) : error ? (
          <Typography sx={{ textAlign: "center", mt: 4, color: "red" }}>{error}</Typography>
        ) : (
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
            {productsData.map((game, index) => (
              <ProductCard key={game._id || index} products={game} />
            ))}
          </Box>
        )}
      </Box>

     
      <SwiperAutoplay products={recommendedGames} />
    </>
  );
};

export default Home;
