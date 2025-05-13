import React from "react";
import { FormLabel, TextField, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const FormTextField = ({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
  disabled,
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
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{ flexGrow: sx?.flexGrow }}
    >
      <FormLabel
        htmlFor={id}
        disabled={disabled}
        required={required}
        sx={{
          color: disabled
            ? theme.palette.secondary.light
            : theme.palette.secondary.light,
        }}
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
        sx={{
          backgroundColor: disabled
            ? theme.palette.secondary.main
            : theme.palette.primary.contrastText,
          borderRadius: 4,
          ...sx,
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 4,
              borderColor: theme.palette.secondary.light,
            },
          },
          "&:focus-within": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 4,
              borderColor: theme.palette.secondary.light,
            },
            "& .MuiInputLabel-outlined": {
              color: theme.palette.secondary.main,
            },
          },
        }}
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
