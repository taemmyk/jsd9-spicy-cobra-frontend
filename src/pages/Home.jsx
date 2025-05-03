import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Heading from "../components/common/Heading";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";
import SwiperGrid from "../components/common/SwiperGrid";

import products from "../data/products.json";
import { newsItems } from "../data/misc";

const Home = () => {
  const recommendedGames = products.slice(0, 5);

  return (
    <>
      <Box
        component="img"
        src="https://www.spieltimes.io/wp-content/uploads/2024/08/The-Rise-of-Indie-Games-A-New-Era-in-Gaming-1024x576.webp"
        sx={{
          width: "100%",
          height: {
            xs: "auto",
            md: "50vh",
          },
          objectFit: "cover",
          objectPosition: "center",
        }}
        loading="lazy"
      />
      <Box sx={{ paddingY: 2 }}>
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
        <Box
          sx={{
            backgroundColor: theme.palette.accent.emphasisdark,
            color: theme.palette.secondary.contrastText,
            padding: 2,
          }}
        >
          <Box
            sx={{
              height: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginX: "auto",
            }}
          >
            <Box sx={{ display: "flex", gap: 4 }}>
              <CalendarMonthIcon
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  display: { xs: "none", md: "block" },
                  textTransform: "uppercase",
                  color: theme.palette.secondary.contrastText,
                }}
              >
                28/03
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                color: theme.palette.secondary.contrastText,
              }}
            >
              TOKYO GAME SHOW 2025 Oversea Sessions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                color: theme.palette.secondary.contrastText,
              }}
            >
              10am Justco Amarin Plaza
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "stretch",
            marginY: 4,
            paddingX: 4,
          }}
        >
          <Box sx={{ flex: 3, display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardMedia
                component="img"
                image={newsItems[0].image}
                alt={newsItems[0].alt}
                sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                loading="lazy"
              />
              <Box
                sx={{
                  backgroundColor: theme.palette.background.layout,
                  textAlign: "center",
                  color: theme.palette.secondary.light,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingY: 1,
                }}
              >
                <Typography variant="caption">
                  {newsItems[0].updated}
                </Typography>
              </Box>
              <CardContent
                sx={{
                  padding: 3,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.secondary.light }}
                >
                  {newsItems[0].title}
                </Typography>
                <Typography variant="body2">
                  {newsItems[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {newsItems.slice(1).map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  flexGrow: 1,
                  backgroundColor: theme.palette.background.card,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.alt}
                  sx={{
                    borderRadius: 4,
                    maxWidth: "45%",
                    height: "auto",
                    flexShrink: 0,
                  }}
                  loading="lazy"
                />
                <CardContent
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{
                      color: theme.palette.secondary.light,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: { xs: "none", md: "block" },
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
