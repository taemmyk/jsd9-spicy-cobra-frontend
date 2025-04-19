import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

function CartItemCard({ product }) {
  const theme = useTheme();
  const currentPrice = Math.floor(
    parseInt(product.price) *
      ((100 - parseInt(product.discount_percentage)) / 100)
  );
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          placeItems: "center",
          backgroundColor: theme.palette.background.card,
          paddingY: 2,
        }}
      >
        <Typography
          variant="body3"
          fontWeight="semibold"
          sx={{ gridColumn: "span 2" }}
        >
          {product.title}
        </Typography>
        <Typography variant="body3" fontWeight="semibold">
        ฿{currentPrice}
        </Typography>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              color: theme.palette.negative.default,
              width: { xs: 24, md: 32 },
              height: { xs: 24, md: 32 },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}

export default CartItemCard;
