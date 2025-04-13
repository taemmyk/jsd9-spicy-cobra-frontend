import React from "react";
import { Box, Stack } from "@mui/material";

const PaginationDots = ({ total, currentIndex, onDotClick }) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onDotClick(index)}
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: currentIndex === index ? "secondary.main" : "grey.400",
            cursor: "pointer",
          }}
        />
      ))}
    </Stack>
  );
};

export default PaginationDots;
