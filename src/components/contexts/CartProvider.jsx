import React, { useState, useCallback } from "react";
import { CartContext } from "./CartContext";
import SnackbarGeneric from "../common/SnackbarGeneric";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarBgColor, setSnackbarBgColor] = useState(null);
  const [snackbarIcon, setSnackbarIcon] = useState(null);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarBgColor(null);
      setSnackbarIcon(null);
    }, 100);
  }, []);

  //! multiple copies not allowed
  const addToCart = (
    (itemToAdd) => {
      const isItemInCart = cartItems.some(
        (item) => item._id === itemToAdd._id
      );

      if (!isItemInCart) {
        setCartItems([...cartItems, itemToAdd]);
        if (snackbarOpen) setSnackbarOpen(false);
        setSnackbarBgColor(null);
        setSnackbarIcon(<AddShoppingCartIcon />);
        setSnackbarMessage(`${itemToAdd.title} added to your cart.`);
        setSnackbarOpen(true);
      } else {
        if (snackbarOpen) setSnackbarOpen(false);
        setSnackbarBgColor("#A63D4A");
        setSnackbarIcon(<ProductionQuantityLimitsIcon />);
        setSnackbarMessage(`${itemToAdd.title} is already in your cart.`);
        setSnackbarOpen(true);
      }
    }
  );

  const removeFromCart = useCallback(
    (itemId) => {
      const itemToRemove = cartItems.find((item) => item._id === itemId);
      const updatedCart = cartItems.filter(
        (item) => item._id !== itemId
      );
      setCartItems(updatedCart);
      if (itemToRemove) {
        setSnackbarBgColor("#A63D4A");
        setSnackbarIcon(<RemoveShoppingCartIcon />);
        setSnackbarMessage(`${itemToRemove.title} removed from your cart.`);
        setSnackbarOpen(true);
      }
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    if (cartItems.length > 0) {
      setCartItems([]);
      // setSnackbarMessage("Cart cleared.");
      // setSnackbarIcon(<ProductionQuantityLimitsIcon />);
      // setSnackbarOpen(true);
    }
  }, [cartItems]);

  const setPayment = useCallback((method) => {
    setPaymentMethod(method);
  }, []);

  const cartContextValue = {
    items: cartItems,
    paymentMethod: paymentMethod,
    addItem: addToCart,
    removeItem: removeFromCart,
    clearCart: clearCart,
    setPaymentMethod: setPayment,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
      <SnackbarGeneric
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        bgColor={snackbarBgColor}
        icon={snackbarIcon}
      />
    </CartContext.Provider>
  );
};
