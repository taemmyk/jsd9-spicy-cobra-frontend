import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import { useTheme } from "@mui/material/styles";

function Devlogs() {
  const theme = useTheme();
  return (
    <>
      <Heading section="Developer Logs" />
    </>
  );
}

export default Devlogs;
