import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../../assets/logo.png";
import ButtonNavbar from "../common/ButtonNavbar";
import TemporaryDrawer from "../orders/TemporaryDrawer";

const Header = () => {
  const theme = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleCartDrawer = (newOpen) => () => {
    setIsCartOpen(newOpen);
  };

  const handleSearchClick = () => {
    navigate("/games");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.layout }}
    >
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{
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
              src={Logo}
              loading="lazy"
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
            <Button onClick={handleSearchClick} sx={{ p: 1 }}>
              <SearchIcon
                sx={{
                  width: { xs: 28, md: 40 },
                  height: { xs: 28, md: 40 },
                  color: theme.palette.secondary.light,
                }}
              />
            </Button>
            <TemporaryDrawer
              open={isCartOpen}
              toggleDrawer={toggleCartDrawer}
            />
            <Link
              to={user ? "/dashboard" : "/membership"}
              style={{ textDecoration: "none" }}
            >
                {user ? (
                  // ✅ แสดงชื่อหรืออีเมลถ้า login แล้ว
                  <Typography
                    sx={{
                      fontSize: { xs: 12, md: 16 },
                      color: theme.palette.secondary.light,
                      textTransform: "none",
                    }}
                  >
                    {user.email}
                  </Typography>
                ) : (
                  <IconButton>
                  <PersonIcon
                    sx={{
                      width: { xs: 28, md: 40 },
                      height: { xs: 28, md: 40 },
                      color: theme.palette.secondary.light,
                    }}
                  />
                  </IconButton>
                )}
            </Link>
          </Box>
        </Container>
      </Toolbar>
      <Toolbar>
        <Container
          maxWidth="xl"
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
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
