import React from "react";
import {
  Grid,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

function ReviewCard({ product, ratingValue, reviewContent }) {
  const theme = useTheme();
  return (
    <>
      <Card
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.layout,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid>
              <CardMedia
                component="img"
                image={product.image_thumbnail}
                alt={product.title}
                sx={{ height: "auto", maxWidth: "100%" }}
              />
            </Grid>
            <Grid>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.light }}
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
              <Typography variant="body1">{reviewContent}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ReviewCard;
