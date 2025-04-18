import React from "react";
import { Box, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";

import products from "../data/products.json";
const Home = () => {
  // const theme = useTheme();

  return (
    <>
      <SwiperPerViewAuto products={products} />
      {/* <Box
        component="section"
        className="hero-block"
        sx={{
          width: "100%",
          height: { xs: "auto", md: 600 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://gdconf.com/sites/default/files/styles/200x200/public/IGF%20juries%202%20image.png"
          alt="Hero Image"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box> */}
      <Heading section="Offers" />

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
        <ProductCard products={products[0]} />
        <ProductCard products={products[1]} />
        <ProductCard products={products[2]} />
      </Box>
      <SwiperAutoplay products={products} />

      <Box
        sx={{
          backgroundColor: theme.palette.accent.emphasis,
          padding: 2,
        }}
      >
        <Box
          sx={{
            height: { xs: 16, lg: 24 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <CalendarMonthIcon
              sx={{ display: { xs: "none", lg: "block" }, fontSize: "2rem" }}
            />
            <Typography
              variant="body1"
              sx={{
                display: { xs: "none", lg: "block" },
                textTransform: "uppercase",
                fontWeight: "600",
                color: theme.palette.secondary.contrastText,
              }}
            >
              28th March
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              display: { lg: "none" },
              whiteSpace: "nowrap",
              color: theme.palette.secondary.contrastText,
            }}
          >
            28/03
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "600",
              whiteSpace: "nowrap",
              color: theme.palette.secondary.contrastText,
            }}
          >
            TOKYO GAME SHOW 2025 Oversea Sessions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: theme.palette.secondary.contrastText,
            }}
          >
            10am Justco Amarin Plaza
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
