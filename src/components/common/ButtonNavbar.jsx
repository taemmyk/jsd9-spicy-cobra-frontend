import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { IconButton, Button, Typography, Box } from "@mui/material";
import {
  ContactSupport as ContactSupportIcon,
  Newspaper as NewspaperIcon,
  Folder as FolderIcon,
  AutoAwesome as AutoAwesomeIcon,
  LogoDev as LogoDevIcon,
} from "@mui/icons-material";

function ButtonNavbar({ path, label }) {
  const theme = useTheme();

  const getIcon = (label) => {
    switch (label.toLowerCase()) {
      case "developer logs":
        return <LogoDevIcon sx={iconStyle} />;
      case "points":
        return <AutoAwesomeIcon sx={iconStyle} />;
      case "games":
        return <FolderIcon sx={iconStyle} />;
      case "news":
        return <NewspaperIcon sx={iconStyle} />;
      case "about":
        return <ContactSupportIcon sx={iconStyle} />;
      default:
        return <ContactSupportIcon sx={iconStyle} />;
    }
  };

  const iconStyle = {
    width: 28,
    height: 28,
    color: theme.palette.secondary.light,
    transition: "all 0.2s ease",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  };

  return (
    <>
      <IconButton
        component={Link}
        to={path}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        {getIcon(label)}
      </IconButton>

      <Button
        component={Link}
        to={path}
        variant="contained"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          fontWeight: 600,
          px: 2,
          py: 1,
          bgcolor: theme.palette.background.card,
          color: theme.palette.primary.contrastText,
          borderRadius: 8,
          boxShadow: 2,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: theme.palette.secondary.dark,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <Typography noWrap>{label}</Typography>
      </Button>
    </>
  );
}

export default ButtonNavbar;
