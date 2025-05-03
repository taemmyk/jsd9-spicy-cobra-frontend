import React from "react";
import { Box } from "@mui/material";
import Heading from "../common/Heading";
import ExpandableCard from "../common/ExpandableCard";
import { reviewItems } from "../../data/misc";

function OrdersTab() {
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
        <Heading section="Your order" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 4,
          }}
        >
          {reviewItems.map((review, index) => (
            <ExpandableCard
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

export default OrdersTab;
