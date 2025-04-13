import React from "react";
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

function ProductCard({
  title,
  productImagePath,
  developer,
  avatarImage,
  rating,
  price,
  sale,
}) {
  const theme = useTheme();
  const currentPrice = Math.floor(price * ((100 - sale) / 100));
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardActionArea href="#">
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sale > 0 && (
            <Box
              sx={{
                position: "absolute",
                backgroundColor: theme.palette.accent.light,
                top: theme.spacing(2),
                left: theme.spacing(2),
                borderRadius: 4,
                padding: theme.spacing(0.5, 1),
              }}
            >
              <Typography variant="saleTag">{sale}%</Typography>
            </Box>
          )}
          <CardMedia
            component="img"
            height="auto"
            image={productImagePath}
            alt={title}
            sx={{
              width: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundColor: theme.palette.primary.main,
              bottom: 0,
              left: theme.spacing(2),
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              padding: theme.spacing(1, 2),
            }}
          >
            {sale > 0 && (
              <Typography
                variant="strikePriceTag"
                sx={{ textDecoration: "line-through" }}
              >
                THB{price}
              </Typography>
            )}
            <Typography variant="priceTag">THB{currentPrice}</Typography>
          </Box>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
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
              alt={developer}
              src={avatarImage}
              sx={{ width: 48, height: 48, objectFit: "cover" }}
            />
            <Typography variant="body2">{developer}</Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Rating name="half-rating-read" defaultValue={parseFloat(rating)} precision={0.1} readOnly />
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={{
                display: { xs: "none", lg: "block" },
              }}
            >
              {rating}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
