import React from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Avatar,
  Stack,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonCta from "../components/common/ButtonCta";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function EditionCard({ edition, price, features }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.card,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        flex: 1,
        minWidth: 200,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            textTransform: "uppercase",
            fontWeight: "800",
            color: theme.palette.secondary.light,
          }}
        >
          {edition}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "800", color: theme.palette.secondary.light }}
        >
          THB {price}
        </Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          "& .MuiListItemText-primary": {
            fontSize: "1rem",
          },
        }}
      >
        {features &&
          features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemText primary={`- ${feature}`} />
            </ListItem>
          ))}
        {!features && (
          <ListItem>
            <ListItemText
              primary="No features listed."
              sx={{ textAlign: "center", fontStyle: "italic" }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
}

function GameDetail() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));
  // Test
  const editionsData = [
    {
      name: "Standard Edition",
      price: "990",
      features: ["Core game access", "Basic support"],
    },
    {
      name: "Deluxe Edition",
      price: "1490",
      features: [
        "Core game access",
        "Premium support",
        "Exclusive in-game items",
        "Digital artbook",
      ],
    },
    {
      name: "Collector's Edition",
      price: "2490",
      features: [
        "All Deluxe Edition content",
        "Physical statue",
        "Steelbook case",
        "Soundtrack CD",
      ],
    },
  ];
  const defaultPrice = editionsData[0]?.price?.toString() || ""; // default selected
  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 4,
              padding: 4,
              backgroundColor: theme.palette.background.card,
              borderRadius: 4,
            }}
          >
            <Typography variant="h3">Home Sweet Home : Survive</Typography>
            <Typography variant="body1">
              Home Sweet Home is back with its soul-stirring sequel that will
              haunt you to the ground ! Immerse yourself in a world of Thai
              myths, let's fight together to get out of this horrifying world.
              The 4vs1 game that will give you the experience of hunting and
              being hunted in one game.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  bgcolor: theme.palette.primary.contrastText,
                }}
              >
                <Select
                  defaultValue={defaultPrice}
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    bgcolor: "transparent",
                    padding: 1,
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {editionsData.map((edition) => (
                    <MenuItem key={edition.name} value={edition.price}>
                      {edition.name} THB {edition.price}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                mx: "auto",
                justifyContent: "center",
              }}
            >
              <ButtonCta label="Buy Now" />
              <ButtonCta label="Add to Cart" />
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            order: { md: 3 },
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Developer
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Avatar
              alt=""
              src=""
              sx={{ width: "3rem", height: "3rem", ml: 1, borderRadius: "50%" }}
            />
            <Box sx={{ ml: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                YGGDRAZIL GROUP
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                Bangkok
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ThumbUpIcon sx={{ color: theme.palette.secondary.light }} />
              {isSmallScreen && <Typography variant="body4">20k</Typography>}
              {isMediumScreen && (
                <Typography variant="body4">20,000</Typography>
              )}
              {!isSmallScreen && !isMediumScreen && (
                <Typography variant="body4">20,000</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ThumbDownIcon sx={{ color: theme.palette.secondary.light }} />
              {isSmallScreen && <Typography variant="body4">20k</Typography>}
              {isMediumScreen && (
                <Typography variant="body4">20,000</Typography>
              )}
              {!isSmallScreen && !isMediumScreen && (
                <Typography variant="body4">20,000</Typography>
              )}
            </Box>
          </Stack>
          <Box sx={{ marginTop: 4 }}>
            <ButtonCta label="Donate" />
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Schedule
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                Release
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                1st April 2025
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                Last update
              </Typography>
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "300",
                  fontFamily: "Roboto Condensed",
                }}
              >
                25th March 2025
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
            }}
          >
            System Requirements
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {editionsData.map((edition) => (
          <EditionCard
            key={edition.name}
            edition={edition.name}
            price={edition.price}
            features={edition.features}
          />
        ))}
      </Box>
    </>
  );
}

export default GameDetail;
