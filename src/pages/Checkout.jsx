import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import OrderItemCard from "../components/orders/OrderItemCard";
import { useTheme } from "@mui/material/styles";
import CheckoutStepper from "../components/checkout-payment/CheckoutStepper";
import axios from "axios";

function Checkout() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products"); 
        setProducts(res.data); 
      } catch (err) {
        console.error("Failed to fetch order items:", err);
        setError("Error fetching order items");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, []);

  if (loading) return <Typography>Loading order...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <>
      <Heading section="Your Order" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
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
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            {products.map((products, index) => (
              <OrderItemCard key={index} products={products} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
          }}
        >
          <CheckoutStepper />
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
