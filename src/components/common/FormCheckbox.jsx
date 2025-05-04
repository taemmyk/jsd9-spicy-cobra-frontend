import React from "react";
import { Checkbox } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import PropTypes from "prop-types";

function FormCheckbox({ checked, onChange, name, ...rest }) {
  const theme = useTheme();

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
      onChange={onChange}
      name={name}
      {...rest}
      style={{ padding: "0px", margin: "0px" }}
    />
  );
}

FormCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default FormCheckbox;