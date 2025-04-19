import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Badge,
  List,
  ListItem,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ButtonNavbar from "../common/ButtonNavbar";
import SearchInput from "../common/SearchInput";
import Popover from "@mui/material/Popover";

import Order from "../../pages/Order";
import TemporaryDrawer from "../orders/TemporaryDrawer";

const Header = () => {
  const theme = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    navigate(`/search?search=${encodeURIComponent(newValue)}`, { replace: true });
  };

  const handleClearInput = () => {
    setSearchText("");
    navigate(`/search?search=`);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleCartDrawer = (newOpen) => () => {
    setIsCartOpen(newOpen);
  };

  return (
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

        <SearchInput
          isSearchOpen={isSearchOpen}
          searchText={searchText}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleSearchSubmit={handleSearchSubmit}
          sx={{ mx: 2 }}
        />

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
          <TemporaryDrawer open={isCartOpen} toggleDrawer={toggleCartDrawer} />
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
            <ButtonNavbar path="/news" label="news" />
          </ListItem>
          <ListItem>
            <ButtonNavbar path="/games" label="games" />
          </ListItem>
          <ListItem>
            <ButtonNavbar path="/devlogs" label="developer logs" />
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
