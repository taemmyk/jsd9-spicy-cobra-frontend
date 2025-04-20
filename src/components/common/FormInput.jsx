import React from "react";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  styled,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const FormInput = ({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
  required,
  sx,
  size = "small",
  gridSize = { xs: 6 },
}) => {
  const theme = useTheme();
  return (
    <FormGrid item xs={gridSize.xs} md={gridSize.md}>
      <FormLabel
        htmlFor={id}
        required={required}
        sx={{ color: theme.palette.secondary.light }}
      >
        {label}
      </FormLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        size={size}
        sx={{ backgroundColor: theme.palette.primary.contrastText, ...sx }}
      />
    </FormGrid>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  sx: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium"]),
  gridSize: PropTypes.shape({
    xs: PropTypes.number,
    md: PropTypes.number,
  }),
};

export default FormInput;
