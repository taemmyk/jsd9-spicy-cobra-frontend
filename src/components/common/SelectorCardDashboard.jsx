import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from '@mui/icons-material/Logout';

function SelectorCardDashboard({
  value,
  label,
  selectedTab,
  handleTabChange,
  sx: customCardSx,
  actionAreaSx: customActionAreaSx,
  typographySx: customTypographySx,
}) {
  const theme = useTheme();

  const displayTabIcon = (value) => {
    const defaultIconSx = [
      {
        color: theme.palette.primary.contrastText,
      },
      selectedTab === value && {
        color: theme.palette.secondary.light,
      },
    ];

    if (value === "dashboard") {
      return <DashboardIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "orders") {
      return <ReceiptIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "profile") {
      return <PersonIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "review") {
      return <RateReviewIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "inventory") {
      return <InventoryIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "logout") {
      return < LogoutIcon fontSize="small" sx={defaultIconSx} />;
    }
    return null;
  };

  return (
    <Card
      selected={selectedTab === value}
      sx={{
        backgroundColor: theme.palette.background.layout,
        borderRadius: 0,
        boxShadow: "none",
        ...(selectedTab === value && {
          backgroundColor: theme.palette.background.paper,
        }),
        ...customCardSx,
      }}
    >
      <CardActionArea
        onClick={() => handleTabChange({ target: { value } })}
        sx={{
          ".MuiCardActionArea-focusHighlight": {
            backgroundColor: theme.palette.secondary.dark,
          },
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            "& .MuiTypography-root": {
              color: theme.palette.secondary.contrastText,
            },
            "& svg": {
              color: theme.palette.secondary.contrastText,
            },
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
          ...customActionAreaSx,
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {displayTabIcon(value)}
          <Typography
            sx={{
              fontWeight: selectedTab === value ? "500" : "400",
              paddingRight: 3,
              color: selectedTab === value
                ? theme.palette.secondary.light
                : theme.palette.primary.contrastText,
              ...customTypographySx,
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SelectorCardDashboard;