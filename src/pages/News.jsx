import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from "@mui/material";
import Heading from "../components/common/Heading";
import { newsItems } from "../data/misc";

function News() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 2,
        }}
      >
        <Paper elevation={3} />
        <Heading section="News" />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "stretch",
            marginY: 4,
            paddingX: 4,
          }}
        >
          <Box
            sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {newsItems.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  flexGrow: 1,
                  backgroundColor: theme.palette.background.card,
                  maxHeight: 300,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.alt}
                  sx={{
                    borderRadius: 4,
                    maxWidth: "45%",
                    height: "auto",
                    flexShrink: 0,
                  }}
                  loading="lazy"
                />
                <CardContent
                  sx={{
                    padding: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{
                      color: theme.palette.secondary.light,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: { xs: "none", md: "block" },
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default News;
