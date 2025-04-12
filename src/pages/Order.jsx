import React from "react";
import { Box, Typography } from "@mui/material";

function Order() {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 24, md: 32 },
        textTransform: "uppercase",
      }}
    >
      Order
    </Typography>
  );
}

export default Order;
