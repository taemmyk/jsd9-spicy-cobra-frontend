import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  RadioGroup,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { CartContext } from "../contexts/CartContext";
import FormTextField from "../common/FormTextField";

function PaymentForm() {
  const theme = useTheme();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const { paymentMethod, setPaymentMethod } = useContext(CartContext);

  const handlePaymentTypeChange = (event) => {
    const value = event.target.value;
    setPaymentMethod(value);
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

  const handleCreditCardSelect = () => {
    setPaymentMethod("Credit Card");
  };

  const handleQrCodeSelect = () => {
    setPaymentMethod("QR");
  };

  return (
    <>
      <Typography variant="body1" sx={{ paddingTop: 4 }}>
        Payment
      </Typography>
      <Stack
        spacing={{ xs: 3, sm: 6 }}
        useFlexGap
        sx={{ marginTop: 2, paddingY: 4 }}
      >
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="Payment options"
            name="paymentType"
            value={paymentMethod}
            onChange={handlePaymentTypeChange}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Card
              selected={paymentMethod === "Credit Card"}
              sx={{
                backgroundColor: theme.palette.background.card,
                ...(paymentMethod === "Credit Card" && {
                  backgroundColor: theme.palette.background.layout,
                }),
              }}
            >
              <CardActionArea
                onClick={handleCreditCardSelect}
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
                      paymentMethod === "Credit Card" && {
                        color: theme.palette.primary.contrastText,
                      },
                    ]}
                  />
                  <Typography sx={{ fontWeight: "medium" }}>Card</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              selected={paymentMethod === "QR"}
              sx={{
                backgroundColor: theme.palette.background.card,
                ...(paymentMethod === "QR" && {
                  backgroundColor: theme.palette.background.layout,
                }),
              }}
            >
              <CardActionArea
                onClick={handleQrCodeSelect}
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
                  <QrCodeRoundedIcon
                    fontSize="small"
                    sx={[
                      {
                        color: theme.palette.primary.contrastText,
                      },
                      paymentMethod === "QR" && {
                        color: theme.palette.primary.contrastText,
                      },
                    ]}
                  />
                  <Typography sx={{ fontWeight: "medium" }}>QR Code</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </RadioGroup>
        </FormControl>
        {paymentMethod === "Credit Card" && (
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
            </Box>
          </Box>
        )}
        {paymentMethod === "QR" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">QR Code</Typography>
            <Typography variant="body2" gutterBottom>
              Follow the instruction below to complete your payment. The system will generate a QR code for you to scan.
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
          </Box>
        )}
      </Stack>
    </>
  );
}

export default PaymentForm;
