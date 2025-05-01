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
          <ExpandableCard product={productsData[2]} />
          <ExpandableCard product={productsData[8]} />
        </Box>
      </Box>
    </>
  );
}

export default OrdersTab;
