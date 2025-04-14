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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Typography variant="body1" fontWeight="semibold">
          {category}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Typography variant="body1" fontWeight="semibold">
        {total}
      </Typography>
    </Box>
  );
}

export default OrderItemReviewCard;
