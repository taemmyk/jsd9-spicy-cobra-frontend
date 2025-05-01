import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Heading from "../components/common/Heading";

function Devlogs() {
  const theme = useTheme();
  return (
    <>
      <Heading section="Developer Logs" />
    </>
  );
}

export default Devlogs;
