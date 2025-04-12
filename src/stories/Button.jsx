import React from "react";

import PropTypes from "prop-types";

// import './button.css';

import { Button as MuiButton } from "@mui/material";

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  backgroundColor,
  size = "medium",
  label,
  onClick,
  ...props
}) => {
  const variant = primary ? "contained" : "outlined";
  const color = primary ? "primary" : "secondary";

  const styleOverrides = {
    fontSize: 16,
    fontWeight: 600,
    bgcolor: "#1E1B2D",
    color: "#E5E7EB",
    borderRadius: 8,
    boxShadow: 2,
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "#674EA7",
      color: "#E5E7EB",
    },
  };

  if (backgroundColor) {
    styleOverrides.backgroundColor = backgroundColor;
  }

  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      sx={styleOverrides}
      {...props}
    >
      {label}
    </MuiButton>
  );
};



Button.propTypes = {
  /** Is this the principal call to action on the page? */
  primary: PropTypes.bool,
  /** What background color to use */
  backgroundColor: PropTypes.string,
  /** How large should the button be? */
  size: PropTypes.oneOf(["small", "medium"]),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Optional click handler */
  onClick: PropTypes.func,
};
