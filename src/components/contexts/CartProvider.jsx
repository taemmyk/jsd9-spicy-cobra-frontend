// CartProvider.jsx
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
      // console.log(`trying to add ${itemToAdd.product_id}`)
      const isItemInCart = cartItems.some((item) => item.product_id === itemToAdd.product_id);

      if (!isItemInCart) {
        setCartItems([...cartItems, itemToAdd]);
      } else {
        setSnackbarMessage(`${itemToAdd.title} is already in your cart.`);
        setSnackbarOpen(true);
      }
    },
    [cartItems]
  );

  //! remove item from cart
  const removeFromCart = useCallback(
    (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
    },
    [cartItems]
  );

  const cartContextValue = {
    items: cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
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
