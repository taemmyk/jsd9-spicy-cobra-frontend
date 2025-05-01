import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function OrderItemCard({ product }) {
  const theme = useTheme();
  return (
    <Box
      className="item-entry-card"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingRight: 2,
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
        sx={{
          gridColumn: { xs: "span 2", md: "span 2" },
          display: "flex",
          flexDirection: "column",
          padding: { xs: 1, md: 0 },
        }}
      >
        <Typography variant="body3" fontWeight="semibold">
          {product.title}
        </Typography>
      </Box>
      <Typography variant="body3" fontWeight="semibold">
        ฿{product.price}
      </Typography>
    </Box>
  );
}

export default OrderItemCard;
