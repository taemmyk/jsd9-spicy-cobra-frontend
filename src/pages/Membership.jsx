import React from "react";
import { Box, Typography } from "@mui/material";

function Membership() {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 24, md: 32 },
        textTransform: "uppercase",
        mb: 0,
      }}
    >
      Membership
    </Typography>
  );
}

export default Membership;
