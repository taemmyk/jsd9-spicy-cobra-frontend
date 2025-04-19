import React from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

function ProductCard({ products }) {
  const theme = useTheme();
  const currentPrice = Math.floor(
    parseInt(products.price) *
      ((100 - parseInt(products.discount_percentage)) / 100)
  );
  return (
    <>
      <Link to={products.url_path} style={{ textDecoration: 'none' }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardActionArea>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {products.discount_percentage > 0 && (
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
                    {products.discount_percentage}%
                  </Typography>
                </Box>
              )}
              <CardMedia
                component="img"
                height="auto"
                image={products.image_thumbnail}
                alt={products.title}
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
                {products.discount_percentage > 0 && (
                  <Typography
                    variant="strikePriceTag"
                    sx={{ textDecoration: "line-through" }}
                  >
                    THB{products.price}
                  </Typography>
                )}
                <Typography variant="priceTag">THB{currentPrice}</Typography>
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
                  alt={products.developer}
                  src={products.developer_avatar}
                  sx={{ width: 48, height: 48, objectFit: "cover" }}
                />
                <Typography variant="body3">{products.developer}</Typography>
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
                  defaultValue={parseFloat(products.rating)}
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
                  {products.rating}
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
