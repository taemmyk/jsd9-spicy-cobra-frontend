import React, { useContext } from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";

import OrderItemReviewCard from "./OrderItemReviewCard";
import { CartContext } from "../contexts/CartContext";
import calculateSalePrice from "../../utils/calculateSalePrice";

function ReviewOrderForm() {
  const theme = useTheme();
  const { items } = useContext(CartContext);

  const calculateItemTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  const calculateOrderTotalPrice = () => {
    return items.reduce((total, item) => total + calculateSalePrice(item), 0);
  };


  return (
    <>
      <Typography
        sx={{ mt: 2, mb: 1, color: theme.palette.primary.contrastText }}
      >
        Review Your Order Details Here
      </Typography>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
        }}
      >
        <OrderItemReviewCard
          category="Products"
          description={
            items.length > 0 ? `${items.length} games` : "No items in cart"
          }
          total={
            items.length > 0
              ? `฿${calculateItemTotalPrice().toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Discount"
          total={
            items.length > 0
              ? `฿${(
                  calculateItemTotalPrice() - calculateOrderTotalPrice()
                ).toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Tax"
          description="7% Vat include"
          total={
            items.length > 0
              ? `฿${(calculateOrderTotalPrice() * 0.07).toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Total"
          total={
            items.length > 0
              ? `฿${calculateOrderTotalPrice().toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Payment Method"
          description="Credit card" // TODO: payment context
          total={" "}
        />
      </Box>
    </>
  );
}

export default ReviewOrderForm;
