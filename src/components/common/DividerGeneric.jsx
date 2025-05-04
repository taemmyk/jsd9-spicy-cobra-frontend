import React from "react";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function DividerGeneric({ sx }) {
  const theme = useTheme();
  return (
    <>
      <Divider
        sx={{
          borderBottomWidth: 2,
          borderColor: theme.palette.secondary.main,
          ...sx,
        }}
      />
    </>
  );
}

export default DividerGeneric;
