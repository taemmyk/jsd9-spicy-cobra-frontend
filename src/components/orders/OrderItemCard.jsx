import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function OrderItemCard({ product }) {
  const theme = useTheme();
  return (
    <Box
      className="item-entry-card"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.palette.background.card,
      }}
    >
      <Box
        component="img"
        src={product.image_thumbnail}
        alt={product.title}
        sx={{
          display: { xs: "none", md: "block" },
          maxWidth: "150px",
          height: "auto",
        }}
      />
      <Box
        className="item-detail-container"
        sx={{
          gridColumn: { xs: "span 2", md: "span 2" },
          display: "flex",
          flexDirection: "column",
          p: { xs: 1, md: 0 },
        }}
      >
        <Typography variant="body1" fontWeight="semibold">
          {product.title}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="semibold">
        ฿{product.price}
      </Typography>
    </Box>
  );
}

export default OrderItemCard;
