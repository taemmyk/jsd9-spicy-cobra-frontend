import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import OrderItemCard from "../components/orders/OrderItemCard";
import { useTheme } from "@mui/material/styles";
import CheckoutStepper from "../components/checkout-payment/CheckoutStepper";
import products from "../data/products.json"

function Checkout() {
  const theme = useTheme();

  return (
    <>
      <Heading section="Your Order" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: {
            xs: 2,
            md: 4,
          },
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <OrderItemCard product={products[0]} />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
          }}
        >
          <CheckoutStepper />
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
