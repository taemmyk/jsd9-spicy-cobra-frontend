import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  FormLabel,
  OutlinedInput,
  FormControl,
  Avatar,
  Grid,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import PropTypes from "prop-types";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
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

export default function ProfileTab() {
  const theme = useTheme();
  const avatarFileInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(
    "https://placehold.co/50x50/DBDBDB/DBDBDB"
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const handleAvatarClick = () => {
    avatarFileInputRef.current.click();
  };
  const handleAvatarFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };
  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 4,
          width: "100%",
        }}
      >
        <Heading section="Your Account" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 4,
              marginBottom: 2,
            }}
          >
            <Avatar
              alt="Developer avatar"
              src={avatarImage}
              sx={{
                width: 136,
                height: 136,
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={avatarFileInputRef}
              onChange={handleAvatarFileChange}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5">username@mail.com</Typography>
              <Typography variant="body1">
                <VerifiedIcon sx={{ color: theme.palette.secondary.light }} />{" "}
                Verified developer
              </Typography>
            </Box>
          </Box>

          <FormLabel
            htmlFor="password"
            sx={{ color: theme.palette.secondary.light, display: "block" }}
          >
            Password
          </FormLabel>
          <OutlinedInput
            id="password"
            name="password"
            type="email"
            placeholder="test@mail.com"
            autoComplete="off"
            required={true}
            size="small"
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <FormLabel
              htmlFor="birthday"
              sx={{ color: theme.palette.secondary.light, display: "block" }}
            >
              Birthday
            </FormLabel>
            <OutlinedInput
              id="birthday"
              name="birthday"
              type="date"
              autoComplete="off"
              required={true}
              placeholder="Birthday"
              size="small"
              fullWidth
              sx={{ backgroundColor: theme.palette.primary.contrastText }}
            />
          </FormControl>
          <Divider
            sx={{
              borderBottomWidth: 1,
              borderColor: theme.palette.accent.dark,
              marginY: 2,
            }}
          />
          <Typography variant="h5" sx={{ marginY: 2 }}>Address</Typography>
          <Accordion style={{ backgroundColor: theme.palette.background.card }}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Typography component="span">New York, NY, USA 12345</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: theme.palette.background.layout }}
            >
              <Grid container spacing={3} sx={{ mt: 2 }}>
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
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Divider
            sx={{
              borderBottomWidth: 1,
              borderColor: theme.palette.accent.dark,
              marginY: 2,
            }}
          />
          <Typography variant="h5" sx={{ marginY: 2 }}>
            Payment Method
          </Typography>
          <Accordion style={{ backgroundColor: theme.palette.background.card }}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Typography component="span">
                <CreditCardIcon /> 0000
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: theme.palette.background.layout }}
            >
              <FormGrid container spacing={4}>
                <FormGrid item xs={12}>
                  <FormLabel
                    htmlFor="card-number"
                    required
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Card number
                  </FormLabel>
                  <OutlinedInput
                    id="card-number"
                    autoComplete="card-number"
                    placeholder="0000 0000 0000 0000"
                    required
                    size="small"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.secondary.contrastText,
                    }}
                  />
                </FormGrid>
                <FormGrid item xs={12}>
                  <FormLabel
                    htmlFor="card-expiration"
                    required
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Expiration date
                  </FormLabel>
                  <OutlinedInput
                    id="card-expiration"
                    autoComplete="card-expiration"
                    placeholder="MM/YY"
                    required
                    size="small"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.secondary.contrastText,
                    }}
                  />
                </FormGrid>
              </FormGrid>
            </AccordionDetails>
          </Accordion>

          <ButtonGeneric label="Save Changes" sx={{ marginTop: 4 }} />
        </Box>
      </Box>
    </>
  );
}
