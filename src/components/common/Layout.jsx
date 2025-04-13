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
} from "@mui/material";
import {
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

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

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <AppBar position="static">
        <Toolbar
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
              <ButtonNavbar path="/error" label="points" />
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
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.layout }}
      >
        <Toolbar
          sx={{
            height: { xs: 10, md: 16 },
            px: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Toolbar>
      </AppBar>
    </>
  );
};

export default Layout;
