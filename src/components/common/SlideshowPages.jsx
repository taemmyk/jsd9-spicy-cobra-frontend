import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import PaginationDots from "./PaginationDots"; // Reuse the component

const Slideshow = ({ imageArray }) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box width="100%" mx="auto" textAlign="center">
      <Box
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        borderRadius={2}
        overflow="hidden"
      >
        <IconButton
          onClick={handlePrev}
          sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
        >
          <ArrowBackIos />
        </IconButton>

        <Box component="img"
          src={imageArray[current]}
          alt={`Slide ${current + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <IconButton
          onClick={handleNext}
          sx={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <PaginationDots
        total={imageArray.length}
        currentIndex={current}
        onDotClick={setCurrent}
      />
    </Box>
  );
};

export default Slideshow;