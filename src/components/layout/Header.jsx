import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ButtonNavbar from "../common/ButtonNavbar";
import TemporaryDrawer from "../orders/TemporaryDrawer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCartDrawer = (newOpen) => () => {
    setIsCartOpen(newOpen);
  };

  const handleSearchClick = () => {
    navigate("/games");
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: { xs: 1, md: 4 },
          }}
        >
          <IconButton onClick={handleSearchClick} sx={{ p: 1 }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "60%" },
            alignItems: "center",
          }}
        >
          <ButtonNavbar path="/about" label="about" />
          <ButtonNavbar path="/news" label="news" />
          <ButtonNavbar path="/games" label="games" />
          <ButtonNavbar path="/devlogs" label="developer logs" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
