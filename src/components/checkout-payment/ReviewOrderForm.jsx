import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OrderItemReviewCard from "./OrderItemReviewCard";
import { CartContext } from "../contexts/CartContext";
import {
  calculateSalePrice,
  calculateItemTotalPrice,
  calculateOrderTotalPrice,
} from "../../utils/calculatePrice";
import DividerGeneric from "../common/DividerGeneric";

function ReviewOrderForm() {
  const theme = useTheme();
  const { items, paymentMethod } = useContext(CartContext);

  return (
    <>
      <Typography variant="body1" sx={{ paddingTop: 4 }}>
        Review Your Order Details
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
              ? `฿${calculateItemTotalPrice(items).toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Discount"
          total={
            items.length > 0
              ? `฿${(
                  calculateItemTotalPrice(items) - calculateOrderTotalPrice(items)
                ).toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Tax"
          description="7% Vat include"
          total={
            items.length > 0
              ? `฿${(calculateOrderTotalPrice(items) * 0.07).toFixed(2)}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Total"
          total={
            items.length > 0
              ? `฿${calculateOrderTotalPrice(items).toFixed(2)}`
              : "฿0.00"
          }
        />
        <DividerGeneric />
        <OrderItemReviewCard
          category="Payment Method"
          description={
            paymentMethod === "creditCard"
              ? "Credit card"
              : paymentMethod === "qrCode"
              ? "QR Code"
              : paymentMethod || "Not selected"
          }
          total={" "}
        />
      </Box>
    </>
  );
}

export default ReviewOrderForm;
