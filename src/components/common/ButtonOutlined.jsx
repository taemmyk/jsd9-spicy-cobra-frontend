import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function AddNewGenreButton({ label, icons, onClick, ...rest }) {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={icons ? icons : null}
      sx={{
        color: theme.palette.secondary.light,
        border: `solid 1px ${theme.palette.secondary.light}`,
        paddingX: 4,
        borderRadius: 4,
        whiteSpace: "nowrap",
        "&:hover": {
          color: theme.palette.primary.contrastText,
          borderColor: theme.palette.primary.contrastText,
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default AddNewGenreButton;
