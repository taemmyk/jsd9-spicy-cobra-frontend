import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
  Box,
  Badge,
  List,
  ListItem,
  SvgIcon,
  Divider,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";

import ButtonNavbar from "./ButtonNavbar";

const Layout = () => {
  const theme = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearInput = () => {
    setSearchText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform your search logic here using 'searchText'
    // console.log("Searching for:", searchText);
    // Optionally close the search bar after submitting
    setIsSearchOpen(false);
  };

  // Styled SVG Icon component to handle custom SVG paths
  const CustomSvgIcon = styled(SvgIcon)(
    ({ color = "currentColor", size = "medium" }) => ({
      fontSize: size === "large" ? 40 : size === "small" ? 20 : 24,
      color: color,
    })
  );

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <AppBar position="static">
        <Toolbar
          id="header"
          sx={{
            backgroundColor: theme.palette.background.layout,
            px: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              sx={{
                height: 32,
                width: 32,
                maxHeight: 32,
                maxWidth: 32,
                display: { xs: "flex", md: "none" },
              }}
              alt="The house from the offer."
              src="./logo.png"
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 24, md: 32 },
                textTransform: "uppercase",
                display: { xs: "none", md: "flex" },
              }}
            >
              Cobra
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {isSearchOpen && (
              <InputBase
                ref={inputRef}
                placeholder="Search..."
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchSubmit(event);
                  }
                }}
                sx={{
                  flexGrow: 1,
                  color: "inherit",
                  backgroundColor: theme.palette.primary.light,
                  borderRadius: 8,
                  mx: 2,
                  px: 1,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: { xs: 1, md: 4 },
            }}
          >
            {isSearchOpen && searchText && (
              <IconButton onClick={handleClearInput} sx={{ p: 1 }}>
                <ClearIcon
                  sx={{
                    width: { xs: 28, md: 40 },
                    height: { xs: 28, md: 40 },
                    color: theme.palette.secondary.light,
                  }}
                />
              </IconButton>
            )}
            <IconButton onClick={handleSearchToggle} sx={{ p: 1 }}>
              <SearchIcon
                sx={{
                  width: { xs: 28, md: 40 },
                  height: { xs: 28, md: 40 },
                  color: theme.palette.secondary.light,
                }}
              />
            </IconButton>
            <Link
              to="/order"
              style={{ position: "relative", textDecoration: "none" }}
            >
              <IconButton>
                <Badge badgeContent={1} color="primary">
                  <ShoppingCartIcon
                    sx={{
                      width: { xs: 28, md: 40 },
                      height: { xs: 28, md: 40 },
                      color: theme.palette.secondary.light,
                    }}
                  />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/membership" style={{ textDecoration: "none" }}>
              <IconButton>
                <PersonIcon
                  sx={{
                    width: { xs: 28, md: 40 },
                    height: { xs: 28, md: 40 },
                    color: theme.palette.secondary.light,
                  }}
                />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>

        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.layout,
            px: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: { xs: "100%", md: "60%" },
              alignItems: "center",
            }}
          >
            <ListItem>
              <ButtonNavbar path="/about" label="about" />
            </ListItem>
            <ListItem>
              <ButtonNavbar path="/error" label="news" />
            </ListItem>
            <ListItem>
              <ButtonNavbar path="/games" label="genres" />
            </ListItem>
            <ListItem>
              <ButtonNavbar path="/error" label="developer logs" />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>

      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.background.layout,
          paddingTop: 8,
          paddingX: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { md: 8 },
            justifyContent: { md: "center" },
            alignItems: { md: "center" },
          }}
        >
          {/* go to top */}
          <Box
            sx={{
              width: { md: "1%" },
              alignSelf: { xs: "flex-end", md: "flex-start" },
              order: { md: 4 },
            }}
          >
            <Link
              href="#header"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "10%",
              }}
            >
              <ArrowUpwardIcon
                sx={{
                  fontSize: { xs: 24, md: 40 },
                  color: theme.palette.secondary.light,
                }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: { md: "column" },
              width: { md: "33%" },
            }}
          >
            <Box
              component="img"
              src="./logo.png"
              alt="Profile"
              sx={{
                width: { xs: 80, md: 160 },
                height: { xs: 80, md: 160 },
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: { xs: "66%", md: "100%" },
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                my: { lg: 4 },
              }}
            >
              {/* Youtube */}
              <Link href="https://www.youtube.com/">
                <IconButton sx={{ color: theme.palette.secondary.light }}>
                  <YouTubeIcon
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}
                  />
                </IconButton>
              </Link>
              {/* Discord */}
              <Link href="https://discord.com/">
                <IconButton sx={{ color: theme.palette.secondary.light }}>
                  <CustomSvgIcon
                    viewBox="0 0 50 50"
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}
                  >
                    <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z" />
                  </CustomSvgIcon>
                </IconButton>
              </Link>
              {/* Twitch */}
              <Link href="https://www.twitch.tv/">
                <IconButton sx={{ color: theme.palette.secondary.light }}>
                  <CustomSvgIcon
                    viewBox="0 0 24 24"
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}
                  >
                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
                  </CustomSvgIcon>
                </IconButton>
              </Link>
              {/* Medium */}
              <Link href="https://medium.com/">
                <IconButton sx={{ color: theme.palette.secondary.light }}>
                  <CustomSvgIcon
                    viewBox="0 0 24 24"
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}
                  >
                    <path d="M7 6A7 7 0 107 20 7 7 0 107 6zM18 6.5A3 6.5 0 1018 19.5 3 6.5 0 1018 6.5zM23 8A1 5 0 1023 18 1 5 0 1023 8z" />
                  </CustomSvgIcon>
                </IconButton>
              </Link>
            </Box>
          </Box>
          <Box sx={{ width: { md: "33%" } }}>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", md: "flex" }, textWrap: "nowrap" }}
            >
              Where we strike back!
            </Typography>
          </Box>
          <Box sx={{ width: { md: "33%" }, alignSelf: { md: "flex-start" } }}>
            <List
              sx={{
                paddingX: 8,
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "space-between",
                gap: 2,
                textWrap: "nowrap",
                color: theme.palette.secondary.light,
              }}
            >
              <ListItem>
                <Link to="/about" underline="none">
                  <ListItemText
                    primary="About"
                    sx={{ color: theme.palette.secondary.light }}
                  />
                </Link>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Career"
                  sx={{ color: theme.palette.secondary.light }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Customer support"
                  sx={{ color: theme.palette.secondary.light }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Investment"
                  sx={{ color: theme.palette.secondary.light }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: 1,
            borderColor: theme.palette.accent.dark,
            mx: { xs: 1, md: 4 },
          }}
        />
        <Box
          className="terms-block"
          sx={{
            paddingTop: 4,
            display: "flex",
            justifyContent: "flex-start",
            gap: { xs: 4, md: 8 },
            paddingX: { md: 8 },
            paddingBottom: 2,
          }}
        >
          <Typography variant="h6">Terms of service</Typography>
          <Typography variant="h6">Privacy policy</Typography>
          <Typography variant="h6">Safety & security</Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            paddingX: { md: 8 },
            paddingTop: 1,
            paddingBottom: 2,
          }}
        >
          © 2025 All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Layout;
