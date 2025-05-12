import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
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

function TabsGeneric({ tabsData }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            {...a11yProps(index)}
            sx={{
              color: theme.palette.primary.contrastText,
              "&.Mui-selected": {
                color: theme.palette.secondary.light,
              },
            }}
          />
        ))}
      </Tabs>
      {tabsData.map((tab, index) => (
        <TabPanel key={index} value={value} index={index} dir={theme.direction}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}

TabsGeneric.propTypes = {
  tabsData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default TabsGeneric;