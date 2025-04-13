import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HorizontalImageScroll from "../components/common/Slideshow";
import Heading from "../components/common/Heading";

const Home = () => {
  const theme = useTheme();
  const imageArray = [
    "https://placehold.co/400x200",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
    "https://placehold.co/400x200",
    "https://placehold.co/200x100",
    "https://placehold.co/200x100",
  ];

  return (
    <>
      {/* <Box
        component="section"
        className="hero-block"
        sx={{
          width: "100%",
          height: { xs: "auto", md: 600 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://gdconf.com/sites/default/files/styles/200x200/public/IGF%20juries%202%20image.png"
          alt="Hero Image"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box> */}
      <HorizontalImageScroll images={imageArray} />
      <Heading section="Offers"/>
    </>
  );
};

export default Home;
