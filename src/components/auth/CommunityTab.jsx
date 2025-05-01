import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";
import productsData from "../../data/products.json";

import ReviewCard from "../common/ReviewCard";

function CommunityTab() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 4,
          width: "100%",
        }}
      >
        <Heading section="Community Engagement" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="h4">Your Reviews</Typography>
          <ReviewCard
            product={productsData[2]}
            ratingValue={3.0}
            reviewContent="Review"
          />
          <ReviewCard
            product={productsData[3]}
            ratingValue={3.0}
            reviewContent="Review"
          />
        </Box>
      </Box>
    </>
  );
}

export default CommunityTab;
