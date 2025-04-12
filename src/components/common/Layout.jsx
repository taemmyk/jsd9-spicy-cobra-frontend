import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  List,
  ListItem,
} from "@mui/material";
import {
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon, // Import SearchIcon
} from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import BugReportIcon from "@mui/icons-material/BugReport"; // Using BugReport for the worm icon
import TagIcon from "@mui/icons-material/Tag";

const Layout = () => {
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.layout }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, md: 4 },
            display: "flex",
            flexDirection: "row", // Make it a row
            justifyContent: "space-between", // Space between items
            alignItems: "center",
          }}
        >
          <IconButton color="primary">
            <SearchIcon
              sx={{
                width: { xs: 28, md: 40 },
                height: { xs: 28, md: 40 },
                color: theme.palette.secondary.light,
              }}
            />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 24, md: 32 },
                textTransform: "uppercase",
              }}
            >
              Cobra
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: { xs: 1, md: 4 },
            }}
          >
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
