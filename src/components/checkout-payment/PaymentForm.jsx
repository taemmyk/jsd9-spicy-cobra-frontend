import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import FormTextField from "../common/FormTextField";
import FormCheckbox from "../common/FormCheckbox";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

function PaymentForm() {
  const theme = useTheme();
  const [paymentType, setPaymentType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handlePaymentTypeChange = (event) => {
    const value = event.target.value;
    setPaymentType(value);
    console.log(`PaymentForm ${paymentType}`); //TODO:
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
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
      <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap sx={{ mt: 2 }}>
        <Typography>Payment</Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="Payment options"
            name="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Card
              selected={paymentType === "creditCard"}
              sx={{
                backgroundColor: theme.palette.background.card,
                ...(paymentType === "creditCard" && {
                  backgroundColor: theme.palette.background.layout,
                }),
              }}
            >
              <CardActionArea
                onClick={() => setPaymentType("creditCard")}
                sx={{
                  ".MuiCardActionArea-focusHighlight": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                    "& .MuiTypography-root": {
                      color: theme.palette.secondary.contrastText,
                    },
                    "& svg": {
                      color: theme.palette.secondary.contrastText,
                    },
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CreditCardRoundedIcon
                    fontSize="small"
                    sx={[
                      {
                        color: theme.palette.primary.contrastText,
                      },
                      paymentType === "creditCard" && {
                        color: theme.palette.primary.contrastText,
                      },
                    ]}
                  />
                  <Typography sx={{ fontWeight: "medium" }}>Card</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              selected={paymentType === "bankTransfer"}
              sx={{
                backgroundColor: theme.palette.background.card,
                ...(paymentType === "bankTransfer" && {
                  backgroundColor: theme.palette.background.layout,
                }),
              }}
            >
              <CardActionArea
                onClick={() => setPaymentType("bankTransfer")}
                sx={{
                  ".MuiCardActionArea-focusHighlight": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                    "& .MuiTypography-root": {
                      color: theme.palette.secondary.contrastText,
                    },
                    "& svg": {
                      color: theme.palette.secondary.contrastText,
                    },
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AccountBalanceRoundedIcon
                    fontSize="small"
                    sx={[
                      {
                        color: theme.palette.primary.contrastText,
                      },
                      paymentType === "bankTransfer" && {
                        color: theme.palette.primary.contrastText,
                      },
                    ]}
                  />
                  <Typography sx={{ fontWeight: "medium" }}>
                    Bank account
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </RadioGroup>
        </FormControl>
        {paymentType === "creditCard" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                background: theme.palette.background.paper,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Credit Card Detail</Typography>
                <CreditCardRoundedIcon
                  sx={{ color: theme.palette.secondary.light }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingX: 2,
                  gap: 2,
                }}
              >
                <FormTextField
                  id="card-number"
                  name="card-number"
                  label="Card number"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  autoComplete="card-number"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  sx={{ flexGrow: 2 }}
                />
                <FormTextField
                  id="ccv"
                  name="ccv"
                  label="CCV"
                  type="text"
                  placeholder="123"
                  autoComplete="ccv"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
              <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
                <FormTextField
                  id="card-name"
                  name="card-name"
                  label="Name"
                  type="card"
                  placeholder="John Smith"
                  autoComplete="card-name"
                  required
                />
                <FormTextField
                  id="card-expiration"
                  name="card-expiration"
                  label="Expiration date"
                  type="card-expiration"
                  placeholder="MM/YY"
                  autoComplete="card-expiration"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </Stack>
              <FormControlLabel
                control={<FormCheckbox />}
                label={
                  <Typography variant="body2" marginLeft={2} marginY={2}>
                    Remember credit card details for next time
                  </Typography>
                }
                sx={{ paddingX: 3 }}
              />
            </Box>
          </Box>
        )}
        {paymentType === "bankTransfer" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">QR Code</Typography>
            <Typography variant="body2" gutterBottom>
              Please transfer the payment to the bank account details shown
              below.
            </Typography>

            <CardMedia
              component="img"
              height="auto"
              image="https://placehold.co/200x200/3E2F64/3E2F64"
              alt="QR Code"
              sx={{
                width: "50%",
                objectFit: "cover",
              }}
              loading="lazy"
            />

            <Box sx={{ display: "flex", gap: 1 }}></Box>
          </Box>
        )}
      </Stack>
    </>
  );
}

export default PaymentForm;
