import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Heading from "../components/common/Heading";

function News() {
  const theme = useTheme();
  return (
    <>
      <Heading section="News" />
    </>
  );
}

export default News;
