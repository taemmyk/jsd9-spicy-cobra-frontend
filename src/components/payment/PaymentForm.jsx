import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  RadioGroup,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

const PaymentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: "1px solid ",
  borderColor: (theme.vars || theme).palette.divider,
  background: theme.palette.background.card,
  boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
  [theme.breakpoints.up("xs")]: {
    height: 300,
  },
  [theme.breakpoints.up("sm")]: {
    height: 350,
  },
  ...theme.applyStyles("dark", {
    background:
      "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
    boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
  }),
}));

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
    setPaymentType(event.target.value);
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
      <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
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
                backgroundColor: theme.palette.background.default,
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
                backgroundColor: theme.palette.background.default,
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
            <PaymentContainer>
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
                  gap: 2,
                }}
              >
                <FormGrid sx={{ flexGrow: 1 }}>
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
                <FormGrid sx={{ maxWidth: "20%" }}>
                  <FormLabel
                    htmlFor="cvv"
                    required
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    CVV
                  </FormLabel>
                  <OutlinedInput
                    id="cvv"
                    autoComplete="CVV"
                    placeholder="123"
                    required
                    size="small"
                    value={cvv}
                    onChange={handleCvvChange}
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.secondary.contrastText,
                    }}
                  />
                </FormGrid>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel
                    htmlFor="card-name"
                    required
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Name
                  </FormLabel>
                  <OutlinedInput
                    id="card-name"
                    autoComplete="card-name"
                    placeholder="John Smith"
                    required
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.secondary.contrastText,
                    }}
                  />
                </FormGrid>
                <FormGrid sx={{ flexGrow: 1 }}>
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
              </Box>
            </PaymentContainer>
            <FormControlLabel
              control={
                <Checkbox
                  name="saveCard"
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
              label="Remember credit card details for next time"
            />
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
              image="https://placehold.co/200x200"
              alt="QR Code"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />

            <Box sx={{ display: "flex", gap: 1 }}></Box>
          </Box>
        )}
      </Stack>
    </>
  );
}

export default PaymentForm;
