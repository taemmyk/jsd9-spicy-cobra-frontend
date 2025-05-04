import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";
import ReviewCard from "../common/ReviewCard";
import { reviewItems } from "../../data/misc";

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
          <Typography variant="h5">Your Reviews</Typography>
          {reviewItems.map((review, index) => (
            <ReviewCard
              key={index}
              product={review.product}
              ratingValue={review.ratingValue}
              reviewContent={review.reviewContent}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default CommunityTab;
