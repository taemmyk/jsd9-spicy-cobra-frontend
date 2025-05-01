import React from "react";
import { Box } from "@mui/material";
import Heading from "../common/Heading";
import productsData from "../../data/products.json";
import ExpandableCard from "../common/ExpandableCard";

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
          <ExpandableCard
            product={productsData[2]}
            ratingValue={4.0}
            reviewContent="Once you get past the initial awkwardness of the door-opening mechanics, this is actually a pretty scary game."
          />
          <ExpandableCard
            product={productsData[8]}
            ratingValue={3.5}
            reviewContent="Once you play it for 30 mins above and understand the mechanics of how to make your friend angry, this game is good. Give it a try with 1 or 2 of your friends (with a mic) in a public match!"
          />
        </Box>
      </Box>
    </>
  );
}

export default OrdersTab;
