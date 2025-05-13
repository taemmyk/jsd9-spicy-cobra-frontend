import React from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function FormRadioField({ value, label }) {
  const theme = useTheme();

  return (
    <>
      <FormControlLabel
        value={value}
        control={
          <Radio
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-checked": {
                color: theme.palette.secondary.light,
              },
            }}
          />
        }
        label={label}
      />
    </>
  );
}

export default FormRadioField;
