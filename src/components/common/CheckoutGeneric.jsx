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
        color: theme.palette.primary.contrastText, // ขอบตอนยังไม่ติ๊ก
        "&.Mui-checked": {
          color: theme.palette.primary.contrastText, // ขอบตอนติ๊ก
        },
        "&.MuiCheckbox-root:hover": {
          backgroundColor: "transparent", // ปิดสี hover
        },
        "&.Mui-checked:hover": {
          backgroundColor: "transparent", // ปิดสี hover ตอน checked
        },
        borderRadius: "20%",
        marginBottom: "4",
      }}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled checkbox" }}
      style={{ padding: "0px", margin: "0px" }}
    />
  );
}

export default CheckoutGeneric;
