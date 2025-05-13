import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function ButtonGeneric({ label, onClick, disabled, to, type="button", sx: customSx }) {
  const theme = useTheme();

  const defaultSx = {
    bgcolor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    fontSize: { xs: "1rem", md: "1.25rem" },
    fontWeight: "400",
    paddingX: { xs: 1, md: 2 },
    paddingY: { xs: 0, md: 1 },
    borderRadius: 8,
    boxShadow: 2,
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
    "&.Mui-disabled": {
      bgcolor: theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
      boxShadow: "none",
      cursor: "not-allowed",
      "&:hover": {
        bgcolor: theme.palette.action.disabledBackground,
        color: theme.palette.text.disabled,
      },
    },
  };

  const combinedSx = { ...defaultSx, ...customSx };

  return (
    <>
      {to && type !== "submit" ? (
        <Link to={to} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={combinedSx}
          >
            {label}
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          onClick={onClick}
          disabled={disabled}
          sx={combinedSx}
          type={type}
        >
          {label}
        </Button>
      )}
    </>
  );
}

ButtonGeneric.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  sx: PropTypes.object,
};

export default ButtonGeneric;
