import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ButtonGeneric from "../components/common/ButtonGeneric";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

import DashboardTab from "../components/auth/DashboardTab";

function Dashboard() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const inputRef = useRef(null);

  const displayTabIcon = (value) => {
    const defaultIconSx = [
      {
        color: theme.palette.primary.contrastText,
      },
      selectedTab === value && {
        color: theme.palette.primary.contrastText,
      },
    ];

    if (value === "dashboard") {
      return <DashboardIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "order") {
      return <ReceiptIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "report") {
      return <SummarizeIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "customer") {
      return <PersonIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "review") {
      return <RateReviewIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "inventory") {
      return <InventoryIcon fontSize="small" sx={defaultIconSx} />;
    }
    return null;
  };

  const TabSelectorCard = ({ value, label }) => (
    <Card
      selected={selectedTab === value}
      sx={{
        backgroundColor: theme.palette.background.layout,
        borderRadius: 0,
        boxShadow: "none",
        ...(selectedTab === value && {
          backgroundColor: theme.palette.background.paper,
        }),
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
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {displayTabIcon(value)}
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontWeight: selectedTab === value ? "500" : "400",
              paddingRight: 3,
              color:
                selectedTab === value
                  ? theme.palette.secondary.light
                  : theme.palette.primary.contrastText,
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "stretch",
          minHeight: "800px", //! TO FIX
        }}
      >
        <Box
          sx={{
            flex: { xs: 0, md: 1 },
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.layout,
          }}
        >
          <FormControl component="fieldset" fullWidth sx={{ height: "100%" }}>
            <RadioGroup
              aria-label="Dashboard options"
              name="dashboardTab"
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TabSelectorCard value="dashboard" label="Dashboard" />
              <TabSelectorCard value="order" label="Orders" />
              <TabSelectorCard value="review" label="Community" />
              <TabSelectorCard value="inventory" label="Inventory" />
              <TabSelectorCard value="report" label="Report" />
            </RadioGroup>
          </FormControl>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              // onClick={handleTabChange}
              sx={{
                backgroundColor: theme.palette.negative.default,
                color: theme.palette.primary.contrastText,
                fontSize: "1.25rem",
                fontWeight: "400",
                px: 2,
                py: 1,
                borderRadius: 8,
                boxShadow: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: theme.palette.negative.dark,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              <LogoutIcon />
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                Sign out
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            flex: 5,
            display: "flex",
            flexDirection: "row",
            backgroundColor: theme.palette.background.paper,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            width: "100%",
            height: "100%",
          }}
        >
          {selectedTab === "dashboard" && <DashboardTab />}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
