import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Heading from "../components/common/Heading";
import OrderItemCard from "../components/orders/OrderItemCard";
import { useTheme } from "@mui/material/styles";
import LinearStepper from "../components/checkout-payment/LinearStepper";
import ButtonCta from "../components/common/ButtonCta";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";

function Order() {
  const theme = useTheme();

  return (
    <>
      <Heading section="Your Order" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
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
          }}
        >
          <ButtonCta label="Continue to Shopping" to="/" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <OrderItemCard
              title="Home Sweet Home: Survive"
              edition="Edition B"
              productImagePath="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1056600/header.jpg?t=1725192678"
              price={690}
              isEditable={true}
            />
            <OrderItemCard
              title="Home Sweet Home: Survive"
              edition="Edition B"
              productImagePath="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1056600/header.jpg?t=1725192678"
              price={690}
              isEditable={true}
            />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
          }}
        >
          <OrderItemReviewCard
            category="Products"
            description="2 games"
            total="THB1,380"
          />
          <OrderItemReviewCard
            category="Tax"
            description="7% Vat include"
            total="THB100"
          />
          <OrderItemReviewCard category="Total" total="THB1,380" />
          <ButtonCta label="Proceed to Checkout" to="/checkout" />
        </Box>
      </Box>
    </>
  );
}

export default Order;
