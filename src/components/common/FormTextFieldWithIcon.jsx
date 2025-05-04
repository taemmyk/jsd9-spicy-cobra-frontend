import React, { useState } from "react";
import {
  FormLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import PropTypes from "prop-types";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const FormTextfieldWithIcon = ({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
  required,
  sx,
  size = "medium",
  value,
  onChange,
  icon,
  iconPosition = "end",
  isPasswordToggle = false,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;
  const passwordToggleIcon = isPasswordToggle ? (
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      edge={iconPosition}
    >
      {showPassword ? (
        <LockOpenIcon sx={{ color: theme.palette.accent.emphasis }} />
      ) : (
        <LockOutlineIcon sx={{ color: theme.palette.secondary.light }} />
      )}
    </IconButton>
  ) : null;

  const defaultIcon =
    !isPasswordToggle && icon ? (
      <InputAdornment position={iconPosition}>{icon}</InputAdornment>
    ) : null;

  const adornment = defaultIcon || passwordToggleIcon;

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <FormLabel
        htmlFor={id}
        sx={{
          color: theme.palette.secondary.light,
          "&.Mui-focused": {
            color: theme.palette.secondary.light,
          },
          ...sx?.label,
        }}
      >
        {label}
      </FormLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        size={size}
        value={value}
        onChange={onChange}
        startAdornment={iconPosition === "start" ? adornment : null}
        endAdornment={iconPosition === "end" ? adornment : null}
        sx={{
          input: { color: theme.palette.primary.contrastText },
          fieldset: { borderColor: theme.palette.secondary.light },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
          },
          ...sx?.input,
        }}
      />
    </FormControl>
  );
};

FormTextfieldWithIcon.propTypes = {
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
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  isPasswordToggle: PropTypes.bool,
};

export default FormTextfieldWithIcon;
