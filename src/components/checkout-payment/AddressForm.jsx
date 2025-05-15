import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FormTextField from "../common/FormTextField";

export default function AddressForm() {
  return (
    <>
      <Typography variant="body1" sx={{ paddingTop: 4 }}>
        Invoice Address
      </Typography>
      <Box>
        <Stack direction="row" spacing={2} sx={{ paddingTop: 4 }}>
          <FormTextField
            id="first-name"
            name="first-name"
            label="First name"
            type="text"
            placeholder="John"
            autoComplete="given-name"
            required
          />
          <FormTextField
            id="last-name"
            name="last-name"
            label="Last name"
            type="text"
            placeholder="Snow"
            required
          />
        </Stack>
        <FormTextField
          id="address1"
          name="address1"
          label="Address Line 1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="receipt address-line1"
          required
        />
        <FormTextField
          id="address2"
          name="address2"
          label="Address Line 2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="receipt address-line2"
          required
        />
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <FormTextField
            id="city"
            name="city"
            label="City"
            type="city"
            placeholder="New York"
            autoComplete="city"
            required
          />
          <FormTextField
            id="state"
            name="state"
            label="State"
            type="text"
            placeholder="NY"
            autoComplete="state"
            required
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ marginTop: 2, paddingBottom: 4 }}>
          <FormTextField
            id="zip"
            name="zip"
            label="Zip / Postal code"
            type="zip"
            placeholder="12345"
            autoComplete="postal-code"
            required
          />
          <FormTextField
            id="country"
            name="country"
            label="State"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            required
          />
        </Stack>
      </Box>
    </>
  );
}
