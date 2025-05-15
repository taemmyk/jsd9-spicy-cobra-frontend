import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/contexts/CartContext";
import Heading from "../components/common/Heading";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import CartItemCard from "../components/cart/CartItemCard";
import {
  calculateItemTotalPrice,
  calculateOrderTotalPrice,
} from "../utils/calculatePrice";
import { decodeToken } from "../utils/decodeToken";
import api from "../services/api";

function Order({ onCloseDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { items, removeItem, removeDuplicated } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  const handleRemoveDuplicated = (itemId) => {
    removeDuplicated(itemId);
  };

  const fetchItemsAndCompare = async () => {
    setIsCheckingOut(true);
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsCheckingOut(false);
        return false;
      }

      const decodedToken = decodeToken(token);
      if (!decodedToken || !decodedToken.userId) {
        setError("Invalid or missing userId in token");
        setLoading(false);
        setIsCheckingOut(false);
        return false;
      }

      const userIdFromToken = decodedToken.userId;
      const response = await api.get(`/orders/user/${userIdFromToken}`);

      if (response.data && !response.data.error && response.data.data) {
        const productIdsFromOrders = [];
        response.data.data.forEach((order) => {
          order.items.forEach((item) => {
            productIdsFromOrders.push(item.product._id);
          });
        });

        const itemsToRemove = [];
        items.forEach((cartItem) => {
          if (productIdsFromOrders.includes(cartItem._id)) {
            itemsToRemove.push(cartItem._id);
          }
        });
        itemsToRemove.forEach((idToRemove) =>
          handleRemoveDuplicated(idToRemove)
        );

        setLoading(false);
        setIsCheckingOut(false);
        return true;
      } else {
        setError("Failed to fetch orders");
        setLoading(false);
        setIsCheckingOut(false);
        return false;
      }
    } catch (err) {
      setError("Failed to fetch orders", err);
      setLoading(false);
      setIsCheckingOut(false);
      return false;
    }
  };

  const handleCheckoutClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to checkout!");
      navigate("/membership");
      return;
    }

    await fetchItemsAndCompare();
    navigate("/checkout");
  };

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
    return to ? (
      <Link to={to} style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={buttonSx} onClick={onClick}>
          {label}
        </Button>
      </Link>
    ) : (
      <Button variant="contained" sx={buttonSx} onClick={onClick}>
        {label}
      </Button>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchItemsAndCompare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, removeItem, removeDuplicated]);

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
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && !loading && (
          <Typography color="error" sx={{ padding: 2 }}>
            {error}
          </Typography>
        )}
        {items.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 4,
            }}
          >
            {items.map((item) => (
              <CartItemCard
                key={item._id}
                product={item}
                onRemove={handleRemove}
              />
            ))}
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ padding: 4, color: theme.palette.secondary.light }}
          >
            No Items in your cart
          </Typography>
        )}
      </Box>

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
                  calculateItemTotalPrice(items) -
                  calculateOrderTotalPrice(items)
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
        {items.length > 0 && (
          <OrderButtonSmall
            label="Continue to Checkout"
            onClick={handleCheckoutClick}
          />
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {error && !loading && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Order;
