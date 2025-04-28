import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Heading from "../components/common/Heading";
import { useTheme } from "@mui/material/styles";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart/CartItemCard";
import axios from "axios";
import { useParams } from "react-router-dom";
function Order({ onCloseDrawer }) {
  const theme = useTheme();
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
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

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products`);
        console.log("Fetched Cart Item:", res.data);
        setCartItem(res.data);
      } catch (err) {
        console.error("Failed to fetch cart item:", err);
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItem();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: 2, gap: 2 }}>
          <Heading section="Your Cart" />
          <OrderButtonSmall label="Continue Shopping" onClick={onCloseDrawer} />
        </Box>
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        {loading ? (
          <Typography sx={{ padding: 4 }}>Loading...</Typography>
        ) : error ? (
          <Typography sx={{ padding: 4, color: "red" }}>{error}</Typography>
        ) : cartItem ? (
          <CartItemCard product={cartItem} key={cartItem.product_id} />
        ) : (
          <Typography sx={{ padding: 4 }}>No Items in your cart</Typography>
        )}
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.paper, padding: "20px" }}>
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
