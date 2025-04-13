import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const ImageItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Image = styled("img")({
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "cover",
  objectPosition: "center",
});

export default function ImageGrid({ images }) {
  if (!images || images.length === 0) {
    return <Box>No images to display.</Box>;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // เปลี่ยนเป็น 4 Columns เพื่อรองรับ Layout
        gridAutoRows: "minmax(100px, auto)",
        gap: 1,
        width: "100%",
      }}
    >
      {images.map((imageUrl, index) => {
        if (index === 0) {
          return (
            <ImageItem key={index} sx={{ gridRow: "span 2", gridColumn: "1" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else if (index === 1) {
          return (
            <ImageItem key={index} sx={{ gridRow: "1", gridColumn: "2" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else if (index === 2) {
          return (
            <ImageItem key={index} sx={{ gridRow: "2", gridColumn: "2" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else if (index === 3) {
          return (
            <ImageItem key={index} sx={{ gridRow: "span 2", gridColumn: "3" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else if (index === 4) {
          return (
            <ImageItem key={index} sx={{ gridRow: "1", gridColumn: "4" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else if (index === 5) {
          return (
            <ImageItem key={index} sx={{ gridRow: "2", gridColumn: "4" }}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        } else {
          return (
            <ImageItem key={index}>
              <Image src={imageUrl} alt={`Image ${index + 1}`} />
            </ImageItem>
          );
        }
      })}
    </Box>
  );
}