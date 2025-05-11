import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Heading from "../common/Heading";
import ExpandableCard from "../common/ExpandableCard";
import axios from "../../services/axiosInstance";

function OrdersTab() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios("http://localhost:5000/orders")
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: 4, width: "100%" }}>
      <Heading section="Your order" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
        {reviews.map((review, index) => (
          <ExpandableCard
            key={index}
            product={review.product}
            ratingValue={review.ratingValue}
            reviewContent={review.reviewContent}
          
          />
        ))}
      </Box>
    </Box>
  );
}

export default OrdersTab;
