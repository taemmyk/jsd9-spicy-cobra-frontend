import React from "react";
import {
  FormLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import PropTypes from "prop-types";

const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  children,
  size = "small",
}) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth size={size} margin="normal" variant="outlined">
      <FormLabel
        htmlFor={id}
        required={required}
        sx={{ color: theme.palette.secondary.light }}
      >
        {label}
      </FormLabel>
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          backgroundColor: theme.palette.primary.contrastText,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                backgroundColor: theme.palette.secondary.main,
              },
            },
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium"]),
  MenuProps: PropTypes.object,
};

export default FormSelect;
