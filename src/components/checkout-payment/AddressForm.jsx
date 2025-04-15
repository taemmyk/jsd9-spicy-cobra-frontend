import React from "react";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
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
    <FormGrid size={gridSize}>
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
  gridSize: PropTypes.object,
};

export default function AddressForm() {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={3}>
        <FormInput
          id="first-name"
          name="first-name"
          label="First name"
          type="text"
          placeholder="John"
          autoComplete="given-name"
          required
          size="small"
          gridSize={{ xs: 12, md: 6 }}
        />
        <FormInput
          id="last-name"
          name="last-name"
          label="Last name"
          type="last-name"
          placeholder="Snow"
          autoComplete="last name"
          required
          size="small"
          gridSize={{ xs: 12, md: 6 }}
        />
        <FormInput
          id="address"
          name="address"
          type="address"
          label="Address"
          placeholder="Full address"
          autoComplete="receipt address"
          required
          size="small"
          gridSize={{ xs: 12 }}
        />

        <FormInput
          id="city"
          name="city"
          type="city"
          label="City"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
        />
        <FormInput
          id="state"
          name="state"
          type="state"
          label="State"
          placeholder="NY"
          autoComplete="State"
          required
          size="small"
        />
        <FormInput
          id="zip"
          name="zip"
          type="zip"
          label="Zip / Postal code"
          placeholder="12345"
          autoComplete="postal-code"
          required
          size="small"
        />
        <FormInput
          id="country"
          name="country"
          type="country"
          label="Country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
        <FormGrid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveAddress"
                value="yes"
                color="secondary"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 30,
                  },
                  color: theme.palette.primary.contrastText,
                  "&.Mui-checked": {
                    color: theme.palette.secondary.light,
                  },
                }}
              />
            }
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </>
  );
}
