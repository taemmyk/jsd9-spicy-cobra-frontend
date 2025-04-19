import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Heading from "../components/common/Heading";
import { useTheme } from "@mui/material/styles";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart/CartItemCard";
import products from "../data/products.json";

function Order({ onCloseDrawer }) {
  const theme = useTheme();
  const [cartItem, setCartItem] = useState(products[0]);

  const OrderButtonSmall = ({ label, to, onClick }) => {
    const buttonSx = {
      bgcolor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      fontSize: { xs: "1rem", md: "1.25rem" },
      fontWeight: "400",
      paddingX: 1,
      paddingY: 0,
      borderRadius: 8,
      boxShadow: 2,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      "&:hover": {
        bgcolor: theme.palette.secondary.dark,
        color: theme.palette.primary.contrastText,
      },
    };
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={buttonSx} onClick={onClick}>
          {label}
        </Button>
      </Link>
    );
  };

  const addItemToCart = (product) => {
    setCartItem(product);
  };

  useEffect(() => {}, [cartItem]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: 2, gap: 2 }}
        >
          <Heading section="Your Cart" />
          <OrderButtonSmall label="Continue Shopping" onClick={onCloseDrawer} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CartItemCard product={cartItem} key={cartItem.product_id} />
        {/* {cartItem ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
              padding: 2,
            }}
          >
            <CartItemCard product={cartItem} key={cartItem.product_id} />
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ padding: 4, color: theme.palette.secondary.light }}
          >
            No Items in your cart
          </Typography>
        )} */}
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
        }}
      >
        <OrderItemReviewCard
          category="Products"
          description={cartItem?.title || "0 games"}
          total={
            cartItem?.price
              ? `฿${cartItem.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Tax"
          description="7% Vat include"
          total={
            cartItem?.price
              ? `฿${(cartItem.price * 0.07).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "฿0.00"
          }
        />
        <OrderItemReviewCard
          category="Total"
          total={
            cartItem?.price
              ? `฿${cartItem.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "฿0.00"
          }
        />
        <OrderButtonSmall label="Continue to Checkout" to="/checkout" />
      </Box>
    </>
  );
}

export default Order;
