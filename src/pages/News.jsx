import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../components/common/Heading";
import { newsItems } from "../data/misc";

function News() {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.secondary.dark }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: "auto",
                md: "50vh",
              },
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <Box
              component="img"
              src="https://gdconf.com/sites/default/files/styles/200x200/public/IGF%20juries%202%20image.png"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              loading="lazy"
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(103, 78, 167, 0.4)",
                zIndex: 1,
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 2,
        }}
      >
        <Paper elevation={3} />
        <Container maxWidth="xl">
          <Box sx={{marginX: 2}}>
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
                    flexDirection: { xs: "column", md: "row" },
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
                      maxWidth: { xs: "100%", md: "45%" },
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
        </Container>
      </Box>
    </>
  );
}

export default News;
