import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Avatar,
  Stack,
  useTheme,
  Rating,
} from "@mui/material";
import calculateSalePrice from "../../utils/calculateSalePrice";

function ProductCard({ product }) {
  const theme = useTheme();
  const currentPrice = product ? calculateSalePrice(product) : null;
  const [ratingValue] = useState(parseFloat(product?.rating) || 0);

  if (!product) {
    return null;
  }

  return (
    <>
      <Link
        to={`/games/${product.product_id}`}
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ borderRadius: 4 }}>
          <CardActionArea>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {product.discount_percentage > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: theme.palette.accent.emphasis,
                    top: theme.spacing(2),
                    left: theme.spacing(2),
                    borderRadius: 4,
                    padding: theme.spacing(0.5, 1),
                  }}
                >
                  <Typography variant="saleTag">
                    {product.discount_percentage}%
                  </Typography>
                </Box>
              )}
              <CardMedia
                component="img"
                height="auto"
                image={product.image_thumbnail}
                alt={product.title}
                sx={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: theme.palette.background.card,
                  bottom: 0,
                  left: theme.spacing(2),
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                  padding: theme.spacing(1, 2),
                }}
              >
                {product.discount_percentage > 0 &&
                  product.price !== undefined && (
                    <Typography
                      variant="strikePriceTag"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ฿{product.price}
                    </Typography>
                  )}
                <Typography variant="priceTag">
                  ฿{currentPrice !== null ? currentPrice : "N/A"}
                </Typography>
              </Box>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: theme.palette.background.card,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  alt={product.developer}
                  src={product.developer_avatar}
                  sx={{ width: 48, height: 48, objectFit: "cover" }}
                />
                <Typography variant="body3">{product.developer}</Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.spacing(2),
                }}
              >
                <Rating
                  name="half-rating-read"
                  value={parseFloat(product?.rating) || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  variant="body2"
                  color="primary.contrastText"
                  sx={{
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {ratingValue.toFixed(1)}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}

export default ProductCard;
