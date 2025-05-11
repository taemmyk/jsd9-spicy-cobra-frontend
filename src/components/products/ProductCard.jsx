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
  Rating,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import calculateSalePrice from "../../utils/calculateSalePrice";

function ProductCard({ product }) {
  const theme = useTheme();
 
  const [ratingValue] = useState(parseFloat(product?.rating) || 0);
  const price = Number(product.price);
  const discount = Number(product.discountPercentage);
  
  const currentPrice =
    !isNaN(price) && !isNaN(discount) && discount > 0
      ? price * ((100 - discount) / 100)
      : price;
  
  if (!product) {
    return null;
  }

  return (
    <>
      <Link
        to={`/games/${product._id}`}
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
              {product.discountPercentage > 0 && (
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
                    {product.discountPercentage}%
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
                loading="lazy"
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
                {!isNaN(price) && discount > 0 && (
  <Typography variant="strikePriceTag" sx={{ textDecoration: "line-through" }}>
    ฿{price.toFixed(2)}
  </Typography>
)}

<Typography variant="priceTag">
  ฿{!isNaN(currentPrice) ? currentPrice.toFixed(2) : "N/A"}
</Typography>

              </Box>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: theme.palette.background.card,
                maxHeight: 100,
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
                  src={product.developerAvatar}
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
