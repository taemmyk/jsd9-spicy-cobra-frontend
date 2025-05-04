import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";

function Report() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 4 }}>
        <Heading section="Developer's Report" />
        <Typography variant="body1">Coming soon</Typography>
      </Box>
    </>
  );
}

export default Report;
