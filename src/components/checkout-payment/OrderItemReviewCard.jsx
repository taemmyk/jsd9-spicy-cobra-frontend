import React from "react";
import { Box, Typography } from "@mui/material";

function OrderItemReviewCard({ category, description, total }) {
  return (
    <Box
      className="item-entry-card"
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        justifyItems: "end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          justifyItems: "center",
        }}
      >
        
        <Typography variant="body3" fontWeight="semibold">
          {category}
        </Typography>
        <Typography variant="body4">{description}</Typography>
      </Box>
      <Typography variant="body3" fontWeight="semibold">
        {total}
      </Typography>
    </Box>
  );
}

export default OrderItemReviewCard;
