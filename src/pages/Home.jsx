"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import Heading from "../components/common/Heading";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../theme";
import SwiperPerViewAuto from "../components/common/SwiperPerViewAuto";
import SwiperAutoplay from "../components/common/SwiperAutoplay";
import SwiperGrid from "../components/common/SwiperGrid";
import { animate, stagger } from "motion";

import { newsItems } from "../data/misc";

import api from "../services/api";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const recommendedGames = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

  const textRef = useRef([]);
  const text1 = `Unleash your indie game. Limitless creativity`;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts(error);
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const elements = textRef.current.filter(Boolean);
    if (elements.length > 0) {
      animate(
        elements,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    }
  }, []);

  const splitWords = (text, ref) => {
    const sentences = text.split(". ").filter(Boolean);

    return sentences.map((sentence, sIndex) => (
      <Box
        key={`sentence-${sIndex}`}
        sx={{ display: "block", textAlign: "center" }}
      >
        {sentence.split(" ").map((word, wIndex) => {
          const index = sIndex * 100 + wIndex;

          let style = {
            display: "inline-block",
            willChange: "transform, opacity",
            marginRight: "12px",
            whiteSpace: "pre",
          };

          if (word === "Unleash") {
            style.color = "#00FFB3";
            style.fontWeight = "black";
          }

          if (["indie", "game"].includes(word)) {
            (style.fontFamily =
              '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif'),
              (style.color = "#00FF7F");
            style.textShadow = "1px 1px 4px rgba(0,255,127,1)";
            style.textTransform = "uppercase";
          }

          if (word === "Limitless") {
            style.letterSpacing = "1rem";
            style.textTransform = "uppercase";
          }

          if (word === "creativity") {
            style.textDecoration = "underline wavy";
            style.textDecorationColor = "#FFC300";
            style.color = "#FFC300";
          }

          return (
            <span
              key={`word-${index}`}
              ref={(el) => (ref.current[index] = el)}
              style={style}
            >
              {word}
            </span>
          );
        })}
      </Box>
    ));
  };

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.secondary.dark }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: "auto",
                md: "50vh",
              },
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <Box
              component="img"
              src="https://www.spieltimes.io/wp-content/uploads/2024/08/The-Rise-of-Indie-Games-A-New-Era-in-Gaming-1024x576.webp"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              loading="lazy"
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(103, 78, 167, 0.8)",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem" },
                  fontWeight: "600",
                }}
              >
                {splitWords(text1, textRef)}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ paddingY: 2 }}>
        <SwiperPerViewAuto products={recommendedGames} />
      </Container>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.palette.background.paper,
              paddingBottom: 2,
              marginX: 2,
            }}
          >
            <Paper elevation={3} />
            <Heading section="For you" />
            <Box sx={{ marginLeft: 4, marginRight: 4 }}>
              <SwiperGrid products={products} />
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ paddingBottom: 2, marginX: 2 }}>
          <Heading section="New Release" />
          <SwiperAutoplay products={recommendedGames} />
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 2,
        }}
      >
        <Paper elevation={3} />
        <Container maxWidth="xl">
          <Box sx={{ marginX: 2 }}>
            <Heading section="News" />
          </Box>
        </Container>
        <Box
          sx={{
            backgroundColor: theme.palette.accent.emphasisdark,
            color: theme.palette.secondary.contrastText,
            padding: 2,
          }}
        >
          <Container maxWidth="xl">
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
          </Container>
        </Box>
        <Container maxWidth="xl">
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
        </Container>
      </Box>
    </>
  );
};

export default Home;
