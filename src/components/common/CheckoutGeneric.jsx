import React, { useState } from "react";
import { Checkbox, useTheme } from "@mui/material";

function CheckoutGeneric() {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: 30,
        },
        color: theme.palette.primary.contrastText,
        "&.Mui-checked": {
          color: theme.palette.secondary.light,
        },
      }}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled checkbox" }}
      style={{ padding: "0px", margin: "0px" }}
    />
  );
}

export default CheckoutGeneric;
