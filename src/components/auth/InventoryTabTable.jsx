import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Tabs,
  Typography,
  Tab,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  MenuItem,
  Button,
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  Stack,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import Heading from "../common/Heading";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import GameManagementAdmin from "./GameManagementAdmin";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function InventoryTabTable() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: 4,
        }}
      >
        <Heading section="Inventory Management" />
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          >
            <Tab
              label="Games"
              {...a11yProps(0)}
              sx={{
                color: theme.palette.primary.contrastText,
                "&.Mui-selected": {
                  color: theme.palette.secondary.light,
                },
              }}
            />
            <Tab
              label="Genre"
              {...a11yProps(1)}
              sx={{
                color: theme.palette.primary.contrastText,
                "&.Mui-selected": {
                  color: theme.palette.secondary.light,
                },
              }}
            />
          </Tabs>

          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
        </Box>
        {/* <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          >
            <Tab
              label="Games"
              sx={{
                color: theme.palette.primary.contrastText,
                "&.Mui-selected": {
                  color: theme.palette.secondary.light,
                },
              }}
            />
            <Tab
              label="Genres"
              sx={{
                color: theme.palette.primary.contrastText,
                "&.Mui-selected": {
                  color: theme.palette.secondary.light,
                },
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <GameManagementAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel> */}
      </Box>
    </>
  );
}

export default InventoryTabTable;
