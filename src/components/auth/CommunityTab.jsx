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
            ratingValue={4.0}
            reviewContent="Once you get past the initial awkwardness of the door-opening mechanics, this is actually a pretty scary game."
          />
          <ReviewCard
            product={productsData[8]}
            ratingValue={3.5}
            reviewContent="Once you play it for 30 mins above and understand the mechanics of how to make your friend angry, this game is good. Give it a try with 1 or 2 of your friends (with a mic) in a public match!"
          />
        </Box>
      </Box>
    </>
  );
}

export default CommunityTab;
