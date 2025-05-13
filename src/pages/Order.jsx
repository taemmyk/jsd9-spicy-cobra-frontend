import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CartContext } from "../components/contexts/CartContext";
import Heading from "../components/common/Heading";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import CartItemCard from "../components/cart/CartItemCard";
import calculateSalePrice from "../utils/calculateSalePrice";

function Order({ onCloseDrawer }) {
  const theme = useTheme();
  const { items, removeItem } = useContext(CartContext);

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  const calculateItemTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  const calculateOrderTotalPrice = () => {
    return items.reduce((total, item) => total + calculateSalePrice(item), 0);
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
        {items.length > 0 ? (
          <OrderButtonSmall label="Continue to Checkout" to="/checkout" />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Order;
