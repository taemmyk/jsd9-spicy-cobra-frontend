import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
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
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InventoryIcon from "@mui/icons-material/Inventory";
import SelectorCardDashboard from "../components/common/SelectorCardDashboard";
import { decodeToken } from "../utils/decodeToken";

import DashboardTabUser from "../components/auth/DashboardTabUser";
import OrdersTab from "../components/auth/OrdersTab";
import CommunityTabUser from "../components/auth/CommunityTabUser";
import ProfileTab from "../components/auth/ProfileTab";
import LogoutTab from "../components/auth/LogoutTab";

import CommunityTabAdmin from "../components/auth/CommunityTabAdmin";
import OrderTabAdmin from "../components/auth/OrdersTabAdmin";
import InventoryTabAdmin from "../components/auth/InventoryTabAdmin";

function Dashboard() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userRole, setUserRole] = useState(null);
  const inputRef = useRef(null);

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

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
      return <PersonIcon fontSize="small" sx={defaultIconSx} />;
    }
    return null;
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role) {
        setUserRole(decodedToken.role);
      }
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(to right, ${theme.palette.background.layout} 50%, ${theme.palette.background.paper} 50%)`,
          width: "100%",
          minHeight: "100vh",
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
                  sx={{ minHeight: "100vh" }}
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
                    <SelectorCardDashboard
                      value="dashboard"
                      label="Dashboard"
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    />
                    <SelectorCardDashboard
                      value="orders"
                      label="Orders"
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    />

                    <SelectorCardDashboard
                      value="review"
                      label="Community"
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    />
                    {userRole == "admin" && (
                      <>
                        <SelectorCardDashboard
                          value="inventory"
                          label="Inventory"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />
                      </>
                    )}

                    <SelectorCardDashboard
                      value="profile"
                      label="Profile"
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    />
                    <SelectorCardDashboard
                      value="logout"
                      label="Logout"
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    />
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
                        <SelectorCardDashboard
                          value="dashboard"
                          label="Dashboard"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />
                        <SelectorCardDashboard
                          value="orders"
                          label="Orders"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />

                        <SelectorCardDashboard
                          value="review"
                          label="Community"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />
                        {userRole == "admin" && (
                          <>
                            <SelectorCardDashboard
                              value="inventory"
                              label="Inventory"
                              selectedTab={selectedTab}
                              handleTabChange={handleTabChange}
                            />
                          </>
                        )}
                        <SelectorCardDashboard
                          value="profile"
                          label="Profile"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />
                        <SelectorCardDashboard
                          value="logout"
                          label="Logout"
                          selectedTab={selectedTab}
                          handleTabChange={handleTabChange}
                        />
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
                minHeight: "100vh",
              }}
            >
              {selectedTab === "dashboard" && <DashboardTabUser />}
              {selectedTab === "orders" && (
                <>
                  {userRole === "admin" && <OrderTabAdmin />}
                  {userRole === "user" && <OrdersTab />}
                </>
              )}
              {selectedTab === "review" && (
                <>
                  {userRole === "admin" && <CommunityTabAdmin />}
                  {userRole === "user" && <CommunityTabUser />}
                </>
              )}
              {selectedTab === "inventory" && <InventoryTabAdmin />}
              {selectedTab === "profile" && <ProfileTab />}
              {selectedTab === "logout" && <LogoutTab />}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
