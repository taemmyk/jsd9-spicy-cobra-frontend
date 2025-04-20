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
import FormInput from "../common/FormInput";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={3} sx={{ mt: 2 }}>
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
          id="address1"
          name="address1"
          type="address1"
          label="Address Line 1"
          placeholder="Street name and number"
          autoComplete="receipt address-line1"
          required
          size="small"
          gridSize={{ xs: 12 }}
        />
        <FormInput
          id="address2"
          name="address2"
          type="address2"
          label="Address Line 2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="receipt address-line2"
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
