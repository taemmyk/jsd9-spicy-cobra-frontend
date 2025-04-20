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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import DashboardTab from "../components/auth/DashboardTab";
import InventoryTab from "../components/auth/InventoryTab";

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
        color: theme.palette.secondary.light,
      },
    ];

    if (value === "dashboard") {
      return <DashboardIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "orders") {
      return <ReceiptIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "report") {
      return <SummarizeIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "profile") {
      return <PersonIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "review") {
      return <RateReviewIcon fontSize="small" sx={defaultIconSx} />;
    } else if (value === "inventory") {
      return <InventoryIcon fontSize="small" sx={defaultIconSx} />;
    }
    return null;
  };

  const TabSelectorCard = ({
    value,
    label,
    sx: customCardSx,
    actionAreaSx: customActionAreaSx,
    typographySx: customTypographySx,
  }) => (
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
              color:
                selectedTab === value
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
          flexDirection: { xs: "column", md: "row" },
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
          {/* Desktop View */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
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
                <TabSelectorCard value="orders" label="Orders" />
                <TabSelectorCard value="review" label="Community" />
                <TabSelectorCard value="inventory" label="Inventory" />
                <TabSelectorCard value="report" label="Report" />
                <TabSelectorCard value="profile" label="Profile" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Mobile View */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Accordion
              sx={{ backgroundColor: theme.palette.background.layout }}
            >
              <AccordionSummary
                expandIcon={
                  <ArrowDownwardIcon
                    sx={{ color: theme.palette.secondary.light }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ backgroundColor: theme.palette.background.layout }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    paddingRight: 3,
                    color: theme.palette.secondary.light,
                    paddingX: 2,
                  }}
                >
                  {displayTabIcon(selectedTab)}{" "}
                  {selectedTab === "review"
                    ? "Community"
                    : selectedTab &&
                      selectedTab.charAt(0).toUpperCase() +
                        selectedTab.slice(1).toLowerCase()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  fullWidth
                  sx={{ height: "100%" }}
                >
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
                    <TabSelectorCard value="orders" label="Orders" />
                    <TabSelectorCard value="review" label="Community" />
                    <TabSelectorCard value="inventory" label="Inventory" />
                    <TabSelectorCard value="report" label="Report" />
                    <TabSelectorCard value="profile" label="Profile" />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Logout Button (Conditionally Rendered if Needed) */}
          {/* <Link to="/" style={{ textDecoration: "none" }}>
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
  </Link> */}
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
          {selectedTab === "inventory" && <InventoryTab />}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
