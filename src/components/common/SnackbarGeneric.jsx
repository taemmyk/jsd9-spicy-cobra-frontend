import React, { Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

function SnackbarGeneric({
  open,
  onClose,
  message,
  duration = 2000,
  vertical = "bottom",
  horizontal = "center",
  bgColor,
  icon,
}) {
  const snackbarStyles = {
    backgroundColor: bgColor || "#674EA7",
    color: "#E5E7EB",
  };

  const messageStyles = {
    marginLeft: icon ? 8 : 0, // เพิ่ม margin ซ้ายถ้ามี icon เพื่อเว้นระยะ
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={duration}
        onClose={onClose}
        message={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
            <Typography sx={messageStyles}>{message}</Typography>
          </Box>
        }
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
        sx={{
          "& .MuiSnackbarContent-root": snackbarStyles,
        }}
      />
    </>
  );
}

export default SnackbarGeneric;
