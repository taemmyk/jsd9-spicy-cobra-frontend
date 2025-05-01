import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";
function profileTab() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 4 }}>
        <Heading section="Your Account" />
      </Box>
    </>
  );
}

export default profileTab;
