import React from "react";
import { FormLabel, TextField, useTheme, FormControl } from "@mui/material";
import PropTypes from "prop-types";

const FormTextField = ({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
  required,
  sx,
  size = "small",
  value,
  onChange,
  multiline = false,
  rows,
}) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <FormLabel
        htmlFor={id}
        required={required}
        sx={{ color: theme.palette.secondary.light }}
      >
        {label}
      </FormLabel>
      <TextField
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        size={size}
        variant="outlined"
        sx={{ backgroundColor: theme.palette.primary.contrastText, ...sx }}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={multiline ? rows : undefined}
      />
    </FormControl>
  );
};

FormTextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  sx: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium"]),
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default FormTextField;
