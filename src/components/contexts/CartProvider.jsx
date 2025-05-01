import React, { useState, useCallback } from "react";
import { CartContext } from "./CartContext";
import SnackbarGeneric from "../common/SnackbarGeneric";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  //! multiple copies not allowed
  const addToCart = useCallback(
    (itemToAdd) => {
      const isItemInCart = cartItems.some(
        (item) => item.product_id === itemToAdd.product_id
      );

      if (!isItemInCart) {
        setCartItems([...cartItems, itemToAdd]);
        setSnackbarMessage(`${itemToAdd.title} added to your cart.`);
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(`${itemToAdd.title} is already in your cart.`);
        setSnackbarOpen(true);
      }
    },
    [cartItems]
  );

  const removeFromCart = useCallback(
    (itemId) => {
      const itemToRemove = cartItems.find((item) => item.product_id === itemId);
      const updatedCart = cartItems.filter(
        (item) => item.product_id !== itemId
      );
      setCartItems(updatedCart);
      if (itemToRemove) {
        setSnackbarMessage(`${itemToRemove.title} removed from your cart.`);
        setSnackbarOpen(true);
      }
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    if (cartItems.length > 0) {
      setCartItems([]);
    }
  }, [cartItems]);

  const cartContextValue = {
    items: cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
      <SnackbarGeneric
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </CartContext.Provider>
  );
};
