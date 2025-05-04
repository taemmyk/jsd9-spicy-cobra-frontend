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
import { missionKeypoints, communityItems } from "../data/misc";
import Logo from "../assets/logo.png";

const About = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.layout }}>
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
              src="https://gdconf.com/sites/default/files/Hero_04022025.png"
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
                backgroundColor: "rgba(103, 78, 167, 0.3)",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={Logo}
                sx={{
                  width: { xs: "20%", sm: "15%", md: "10%" },
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                loading="lazy"
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              padding: 4,
            }}
          >
            <Paper elevation={3} />
            <Box
              sx={{
                backgroundColor: theme.palette.background.card,
                padding: 4,
                flex: 1,
                borderRadius: 4,
              }}
            >
              <Heading section="About Spicy Cobra" />
              <Typography variant="body1">
                Revolutionizing game retail, our gamer platform offers seamless
                discovery and acquisition. We empower the community, connecting
                players developers and investors.
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: theme.palette.background.card,
                flex: 1,
                display: "flex",
                alignItems: "center",
                padding: 4,
                borderRadius: 4,
              }}
            >
              <Typography variant="body1">
                By gamers, for gamers: seamless online retail. Discover,
                connect, and acquire all your gaming needs, empowering the Thai
                community.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            padding: 4,
          }}
        >
          <Paper elevation={3} />
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: 4,
              flex: 1,
              borderRadius: 4,
            }}
          >
            <Heading section="Values" />
            <Typography variant="body1">
              We believe in the power of bringing gamers together. Our platform
              is designed to foster interaction, shared experiences, and a sense
              of belonging among enthusiasts.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: 4,
              flex: 1,
              borderRadius: 4,
            }}
          >
            <Heading section="Vision" />
            <Typography variant="body1">
              Our platform unites gamers and fosters belonging. We empower Thai
              developers, contributing to a vibrant ecosystem.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{ paddingY: 4, backgroundColor: theme.palette.background.paper }}
      >
        <Paper elevation={3} />
        <Container maxWidth="xl">
          <Box sx={{ marginX: 12 }}>
            <Heading section="Missions" />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: {
                  xs: 2,
                  md: 4,
                },
              }}
            >
              {missionKeypoints.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: theme.palette.background.card,
                    height: 128,
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 4,
                  }}
                >
                  <Typography variant="body1">{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            paddingBottom: 2,
            marginX: 10,
          }}
        >
          <Heading section="Community" />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "stretch",
              marginY: 4,
              paddingX: 4,
            }}
          >
            <Box sx={{ flex: 3, display: "flex", flexDirection: "column" }}>
              <Card
                sx={{
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  backgroundColor: theme.palette.background.card,
                }}
              >
                <CardMedia
                  component="img"
                  image={communityItems[0].image}
                  alt={communityItems[0].alt}
                  sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                  loading="lazy"
                />

                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {communityItems[0].title}
                  </Typography>
                  <Typography variant="body2">
                    {communityItems[0].description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              {communityItems.slice(1).map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flexGrow: 1,
                    backgroundColor: theme.palette.background.card,
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
                      p: 2,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
    </>
  );
};

export default About;
