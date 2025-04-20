import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import OrderItemCard from "../components/orders/OrderItemCard";
import { useTheme } from "@mui/material/styles";
import CheckoutStepper from "../components/checkout-payment/CheckoutStepper";
import { CartContext } from "../components/contexts/CartContext";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import calculateSalePrice from "../utils/calculateSalePrice";
import ButtonGeneric from "../components/common/ButtonGeneric";

function Checkout() {
  const theme = useTheme();
  const { items } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateItemTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  const calculateOrderTotalPrice = () => {
    return items.reduce((total, item) => total + calculateSalePrice(item), 0);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        flexDirection: "column",
        gridTemplateColumns: "1fr 1fr",
        gap: {
          xs: 2,
          md: 4,
        },
        minHeight: "100vh",
      }}
    >
      <Box
        flexGrow={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
        }}
      >
        <Heading
          section={
            items.length > 1
              ? `Checkout ${items.length} games`
              : `Checkout 1 game`
          }
        />
        <ButtonGeneric
          label="Continue Shopping"
          onClick={handleGoBack}
        ></ButtonGeneric>
        <Box
          flexGrow={1}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
        >
          {items &&
            items.map((product) => (
              <OrderItemCard key={product.product_id} product={product} />
            ))}

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
          </Box>
        </Box>
      </Box>

      <Box
        flexGrow={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
        }}
      >
        <Box>
          <CheckoutStepper />
        </Box>
      </Box>
    </Box>
  );
}

export default Checkout;
