import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Heading from "../common/Heading";
import ExpandableCard from "../common/ExpandableCard";
import api from "../../services/api";

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userIdFromToken = decodedToken.userId;

        if (!userIdFromToken) {
          setError("User ID not found in token");
          setLoading(false);
          return;
        }

        // console.log("token userid", userIdFromToken);

        const response = await api.get(`/orders/user/${userIdFromToken}`);
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ margin: 4 }}>
        <Heading section="Your order" />
        <Box sx={{ marginTop: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 4, width: "100%" }}>
      <Heading section="Your order" />
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.map((order) => (
          <ExpandableCard key={order._id} order={order} />
        ))}
      </Box>
    </Box>
  );
}

export default OrdersTab;