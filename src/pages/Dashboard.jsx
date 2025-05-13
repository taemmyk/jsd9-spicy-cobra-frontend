import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  RadioGroup,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardTab from "../components/auth/DashboardTab";
import OrdersTab from "../components/auth/OrdersTab";
import CommunityTab from "../components/auth/CommunityTab";
import ReportTab from "../components/auth/ReportTab";
import InventoryTab from "../components/auth/InventoryTab";
import ProfileTab from "../components/auth/ProfileTab";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useLocation } from 'react-router-dom';



function Dashboard() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const { token, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialOrderItems = location.state?.orders || [];
  useEffect(() => {
  if (!loading && !token) {
    navigate("/membership");
  }
}, [token, loading]);


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
          background: `linear-gradient(to right, ${theme.palette.background.layout} 50%, ${theme.palette.background.paper} 50%)`,
          width: "100%",
          height: "100vh",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-around",
              alignContent: "stretch",
              minHeight: "800px",
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
                <FormControl
                  component="fieldset"
                  fullWidth
                  sx={{ height: "100vh" }}
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
                height: "100vh",
              }}
            >
              {selectedTab === "dashboard" && <DashboardTab />}
              {selectedTab === "orders" && <OrdersTab initialOrderItems={initialOrderItems} />}
              {selectedTab === "review" && <CommunityTab />}
              {selectedTab === "report" && <ReportTab />}
              {selectedTab === "inventory" && <InventoryTab />}
              {selectedTab === "profile" && <ProfileTab />}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
