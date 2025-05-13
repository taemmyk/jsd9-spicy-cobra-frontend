import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material"; 
import Heading from "../common/Heading"; 
import ExpandableCard from "../common/ExpandableCard"; 
import axios from "../../services/axiosInstance";


function OrdersTab({ initialOrderItems }) { 
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        if (initialOrderItems && initialOrderItems.length > 0) {
          console.log("OrdersTab using initialOrderItems from props:", initialOrderItems);
          setOrderItems(initialOrderItems);
        } else {
          
          console.log("OrdersTab fetching /order_items as fallback.");
          const response = await axios.get("/order_items");
          setOrderItems(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch order items in OrdersTab:", error);
        setOrderItems([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [initialOrderItems]); 

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading your orders...</Typography>
      </Box>
    );
  }

  if (!orderItems || orderItems.length === 0) {
    return (
        <Box sx={{ margin: 4, textAlign: 'center' }}>
            <Heading section="Your order" />
            <Typography sx={{ mt: 2 }}>You have no orders yet.</Typography>
        </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: { xs: 2, md: 4 }, width: "100%" }}>
      <Heading section="Your order" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 4 }, marginTop: 4 }}>
        {orderItems.map((item, index) => (
          <ExpandableCard
            key={item.order_line_id || item.id || index} // Use a stable unique key
            product={item.product}
            ratingValue={item.ratingValue}
            reviewContent={item.reviewContent}
            orderLineId={item.order_line_id}
            
          />
        ))}
      </Box>
    </Box>
  );
}

export default OrdersTab;