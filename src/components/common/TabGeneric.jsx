import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function TabsGeneric({ value, handleChange }) {
  const theme = useTheme();

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
          label="Genres"
          {...a11yProps(1)}
          sx={{
            color: theme.palette.primary.contrastText,
            "&.Mui-selected": {
              color: theme.palette.secondary.light,
            },
          }}
        />
      </Tabs>
    </Box>
  );
}

TabsGeneric.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default TabsGeneric;