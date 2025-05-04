import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../components/common/Heading";
import OrderItemCard from "../components/orders/OrderItemCard";
import CheckoutStepper from "../components/checkout-payment/CheckoutStepper";
import { CartContext } from "../components/contexts/CartContext";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import calculateSalePrice from "../utils/calculateSalePrice";
import ButtonGeneric from "../components/common/ButtonGeneric";

function Checkout() {
  const theme = useTheme();
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(0);

  const calculateItemTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  const calculateOrderTotalPrice = () => {
    return items.reduce((total, item) => total + calculateSalePrice(item), 0);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStepChange = (step) => {
    setCurrentCheckoutStep(step);
  };

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="xl">
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
              {currentCheckoutStep < 3 && (
                <ButtonGeneric
                  label="Continue Shopping"
                  onClick={handleGoBack}
                ></ButtonGeneric>
              )}
              <Box
                flexGrow={1}
                sx={{
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
                    padding: "20px",
                  }}
                >
                  <OrderItemReviewCard
                    category="Products"
                    description={
                      items.length > 0
                        ? `${items.length} games`
                        : "No items in cart"
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
                            calculateItemTotalPrice() -
                            calculateOrderTotalPrice()
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
                padding: "20px",
              }}
            >
              <Box>
                <CheckoutStepper onStepChange={handleStepChange} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Checkout;
