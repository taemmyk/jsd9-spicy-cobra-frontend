import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Select,
  Avatar,
  Stack,
  useMediaQuery,
  Tooltip,
  Card,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonGeneric from "../components/common/ButtonGeneric";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SwiperProductNavigation from "../components/products/SwiperProductNavigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import products from "../data/products.json";
import Heading from "../components/common/Heading";
import ProductCard from "../components/products/ProductCard";

import { CartContext } from "../components/contexts/CartContext";
import calculateSalePrice from "../utils/calculateSalePrice";

function GameDetail() {
  const theme = useTheme();
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [thumbsupCount, setThumbsupCount] = useState(
    Math.max(100, Math.floor(Math.random() * 99999))
  );
  const [thumbsdownCount, setThumbsdownCount] = useState(
    Math.floor(thumbsupCount * Math.random() * 0.1)
  );

  const recommendedGames = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(gameData);
  };

  const handleBuyNow = () => {
    addItem(gameData);
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  const formatCount = (count) => {
    if (isSmallScreen && count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toLocaleString();
  };

  const handleThumbsUp = () => {
    setThumbsupCount((prevCount) => prevCount + 1);
  };

  const handleThumbsDown = () => {
    setThumbsdownCount((prevCount) => prevCount + 1);
  };

  const systemRequirementMock = [
    { hardware: "OS", data: "Windows 10/11" },
    { hardware: "Processor", data: "Intel i5 10400, AMD Ryzen 5 3600" },
    { hardware: "Memory", data: "8 GB RAM" },
    {
      hardware: "Graphics",
      data: "NVIDIA RTX 2060 (6G VRAM), AMD Radeon RX 5600 XT (6G VRAM)",
    },
    { hardware: "Storage", data: "20 GB available space" },
  ];

  useEffect(() => {
    try {
      const targetProduct = products.find((game) => game.product_id === gameId);

      if (targetProduct) {
        setGameData(targetProduct);
        setLoading(false);
      } else {
        setError("Game not found.");
        setLoading(false);
      }
    } catch (err) {
      setError("Error loading game data.", err);
      setLoading(false);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [gameId]);

  if (loading) {
    return <div>Loading game details...</div>;
  }

  if (error) {
    return <div>Error loading game: {error}</div>;
  }

  if (!gameData) {
    return <div>Game not found.</div>;
  }

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "50%" },
              flexGrow: 1,
            }}
          >
            <SwiperProductNavigation product={gameData} />
          </Box>
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "50%" },
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
              padding: 4,
              backgroundColor: theme.palette.background.card,
              borderRadius: 4,
            }}
          >
            <Typography variant="h3">{gameData.title}</Typography>
            {/* Tags */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {gameData.discount_percentage > 0 && (
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    border: "solid 1px #FFC300",
                    padding: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.accent.emphasis,
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    {gameData.discount_percentage}%
                  </Typography>
                </Card>
              )}
              <Card
                sx={{
                  backgroundColor: "transparent",
                  border: "solid 1px #D1B6FF",
                  padding: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "0.85rem",
                  }}
                >
                  {gameData.genre_id_1}
                </Typography>
              </Card>
              {gameData.genre_id_2 && (
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    border: "solid 1px #D1B6FF",
                    padding: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.secondary.light,
                      fontSize: "0.85rem",
                    }}
                  >
                    {gameData.genre_id_2}
                  </Typography>
                </Card>
              )}
              {gameData.genre_id_3 && (
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    border: "solid 1px #D1B6FF",
                    padding: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.secondary.light,
                      fontSize: "0.85rem",
                    }}
                  >
                    {gameData.genre_id_3}
                  </Typography>
                </Card>
              )}
            </Box>
            {/* Price */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {gameData.discount_percentage > 0 ? (
                <>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    ฿
                    {calculateSalePrice(gameData)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.negative.default,
                      fontSize: "1rem",
                      textDecoration: "line-through",
                    }}
                  >
                    ฿{gameData.price}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.secondary.light }}
                >
                  ฿{gameData.price}
                </Typography>
              )}
            </Box>
            <Typography variant="body1">{gameData.description}</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                mx: "auto",
                justifyContent: "center",
              }}
            >
              <ButtonGeneric
                label="Buy Now"
                sx={{
                  backgroundColor: theme.palette.accent.emphasis,
                  "&:hover": {
                    bgcolor: theme.palette.accent.emphasisdark,
                    color: theme.palette.primary.contrastText,
                  },
                }} onClick={handleBuyNow}
              />
              <ButtonGeneric label="Add to Cart" onClick={handleAddToCart} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Developer */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            order: { md: 3 },
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Developer
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Avatar
              alt=""
              src=""
              sx={{ width: "3rem", height: "3rem", ml: 1, borderRadius: "50%" }}
            />
            <Box sx={{ ml: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                {gameData.developer}
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                Bangkok
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ThumbUpIcon
                onClick={handleThumbsUp}
                aria-label="thumbs up"
                sx={{ color: theme.palette.secondary.light, cursor: "pointer" }}
              />
              <Typography variant="body4">
                {formatCount(thumbsupCount)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ThumbDownIcon
                onClick={handleThumbsDown}
                aria-label="thumbs down"
                sx={{ color: theme.palette.secondary.light, cursor: "pointer" }}
              />
              <Typography variant="body4">
                {formatCount(thumbsdownCount)}
              </Typography>
            </Box>
          </Stack>
          <Tooltip title="Coming soon">
            <Box sx={{ marginTop: 4 }}>
              <ButtonGeneric label="Donate" />
            </Box>
          </Tooltip>
        </Box>
        {/* Schedule */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Schedule
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                Release
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                {gameData.release_date}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                Last update
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                25th March 2025
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* System Req */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: 4,
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            System Requirements
          </Typography>
          <Table aria-label="custom padding table">
            <TableBody>
              {systemRequirementMock.map((row) => (
                <TableRow
                  key={row.hardware}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      paddingTop: 1,
                      paddingBottom: 1,
                      fontSize: "0.75rem",
                      fontWeight: "400",
                    }}
                  >
                    {row.hardware}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      paddingTop: 1,
                      paddingBottom: 1,
                      fontSize: "0.75rem",
                      fontWeight: "200",
                    }}
                  >
                    {row.data}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

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
        <Heading section="You may also like" />

        {/* <Box
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
          {recommendedGames.map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
        </Box> */}
      </Box>
    </>
  );
}

export default GameDetail;
