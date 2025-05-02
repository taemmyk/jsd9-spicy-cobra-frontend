import React from "react";
import {
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function ReviewCard({ product, ratingValue, reviewContent }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.layout,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.image_thumbnail}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
            maxWidth: { xs: "600px", md: "300px" },
          }}
        />
        <Box style={{ display: "flex", flexDirection: "column", flexGrow: 2 }}>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.accent.dark,
              wordWrap: "break-word",
            }}
          >
            {product.title}
          </Typography>
          <Rating
            name="text-feedback"
            value={ratingValue}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography
            variant="body2"
            sx={{ wordWrap: "break-word", flexGrow: 1 }}
          >
            {reviewContent}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
