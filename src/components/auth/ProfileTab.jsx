import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextField from "../common/FormTextField";
import DividerGeneric from "../common/DividerGeneric";

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
    } else if (value.length > 16 && cardNumber.length <= 19) {
      setCardNumber(formattedValue.slice(0, 19));
    } else if (value.length > 16) {
      setCardNumber(cardNumber);
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
          <FormTextField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="password"
          />
          <FormTextField
            id="birthday"
            name="birthday"
            label="Birthday"
            type="date"
            placeholder="birthday"
          />
          <DividerGeneric
            sx={{
              marginTop: 2,
            }}
          />
          <Typography variant="h5" sx={{ marginY: 2 }}>
            Address
          </Typography>
          <Accordion style={{ backgroundColor: theme.palette.background.card }}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Typography component="span">New York, NY, USA 12345</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: theme.palette.background.layout }}
            >
              <FormTextField
                id="address1"
                name="address1"
                type="address1"
                label="Address Line 1"
                placeholder="Street name and number"
                autoComplete="receipt address-line1"
                required
              />
              <FormTextField
                id="address2"
                name="address2"
                type="address2"
                label="Address Line 2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                autoComplete="receipt address-line2"
              />

              <FormTextField
                id="city"
                name="city"
                type="city"
                label="City"
                placeholder="New York"
                autoComplete="City"
                required
              />
              <FormTextField
                id="state"
                name="state"
                type="state"
                label="State"
                placeholder="NY"
                autoComplete="State"
                required
              />
              <FormTextField
                id="zip"
                name="zip"
                type="zip"
                label="Zip / Postal code"
                placeholder="12345"
                autoComplete="postal-code"
                required
              />
              <FormTextField
                id="country"
                name="country"
                type="country"
                label="Country"
                placeholder="United States"
                autoComplete="shipping country"
                required
              />
            </AccordionDetails>
          </Accordion>
          <DividerGeneric
            sx={{
              marginTop: 2,
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
              <FormTextField
                id="card-number"
                name="card-number"
                type="text"
                label="Card number"
                placeholder="0000 0000 0000 0000"
                autoComplete="card-number"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              <FormTextField
                id="card-expiration"
                name="card-expiration"
                type="text"
                label="Expiration"
                placeholder="MM/YY"
                autoComplete="card-expiration"
                required
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
            </AccordionDetails>
          </Accordion>

          <ButtonGeneric label="Save Changes" sx={{ marginTop: 4 }} />
        </Box>
      </Box>
    </>
  );
}
