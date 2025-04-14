import React from "react";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface ButtonCtaProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; // เปลี่ยน path เป็น to และทำให้ Optional
}

function ButtonCta({ label, onClick, disabled, to }) {
  const theme = useTheme();

  return (
    <>
      {to ? (
        <Link to={to} style={{ textDecoration: "none" }}>
          {" "}
          {/* เพิ่ม Link ครอบ Button */}
          <Button
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              fontSize: "1.25rem",
              fontWeight: 400,
              px: 2,
              py: 1,
              borderRadius: 8,
              boxShadow: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            {label}
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          onClick={onClick}
          disabled={disabled}
          sx={{
            bgcolor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            fontSize: "1.25rem",
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: 8,
            boxShadow: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: theme.palette.secondary.dark,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
}

export default ButtonCta;
