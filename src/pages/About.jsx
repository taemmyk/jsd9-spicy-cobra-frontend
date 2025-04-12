import React from "react";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 24, md: 32 },
          textTransform: "uppercase",
          mb: 0,
        }}
      >
        About
      </Typography>
    </>
  );
};

export default About;
