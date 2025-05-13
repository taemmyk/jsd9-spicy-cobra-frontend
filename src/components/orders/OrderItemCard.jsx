import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

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
        src={product.imageThumbnail}
        alt={product.title}
        sx={{
          maxWidth: "150px",
          height: "auto",
        }}
        loading="lazy"
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
        ฿{parseFloat(product.price).toFixed(2)}
      </Typography>
    </Box>
  );
}

export default OrderItemCard;
