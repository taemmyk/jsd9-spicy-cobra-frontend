import React from "react";
import { Box, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";
import SlideshowPages from "../components/common/SlideshowPages";
import SwiperSlideshow from "../components/common/PaginationSwiper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";

const Home = () => {
  // const theme = useTheme();
  const imageArray = [
    "https://placehold.co/400x200",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/400x200",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
  ];

  const imageArrayEqual = [
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
  ];

  return (
    <>
      <SwiperSlideshow images={imageArrayEqual} />
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
        <ProductCard
          title="The Land Beneath Us"
          productImagePath="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2131010/header.jpg?t=1736181690"
          developer="FairPlay Studios"
          avatarImage="https://avatars.cloudflare.steamstatic.com/0334b9e9b4d7fcd1fc03fd88cdd7b6c625a1a17f_full.jpg"
          rating="3.8"
          price="690"
          sale="50"
        />
        <ProductCard
          title="The Land Beneath Us"
          productImagePath="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2131010/header.jpg?t=1736181690"
          developer="FairPlay Studios"
          avatarImage="https://avatars.cloudflare.steamstatic.com/0334b9e9b4d7fcd1fc03fd88cdd7b6c625a1a17f_full.jpg"
          rating="4.2"
          price="690"
          sale="30"
        />
        <ProductCard
          title="The Land Beneath Us"
          productImagePath="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2131010/header.jpg?t=1736181690"
          developer="FairPlay Studios"
          avatarImage="https://avatars.cloudflare.steamstatic.com/0334b9e9b4d7fcd1fc03fd88cdd7b6c625a1a17f_full.jpg"
          rating="3.6"
          price="690"
          sale="0"
        />
      </Box>
      <SlideshowPages imageArray={imageArray} />

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
