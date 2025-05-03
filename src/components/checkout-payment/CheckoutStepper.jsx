import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ButtonGeneric from "../common/ButtonGeneric";
import ReviewOrderForm from "./ReviewOrderForm";

import { CartContext } from "../contexts/CartContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const steps = ["Your address", "Payment details", "Review you order"];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  zIndex: 1,
  fontFamily: "Roboto",
  fontSize: "1.5rem",
  display: "flex",
  borderRadius: "50%",
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  ...(ownerState.active && {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    fontWeight: "900",
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const ownerState = { active, completed };
  return (
    <ColorlibStepIconRoot ownerState={ownerState} className={className}>
      {icon}
    </ColorlibStepIconRoot>
  );
}

function CheckoutStepper({ onStepChange, onPaymentTypeChange }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const { clearCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showButton, setShowButton] = useState(false);
  const countdownRef = useRef(null);
  const [paymentType, setPaymentType] = useState("");

  const handlePaymentTypeUpdated = (type) => {
    console.log("handlePaymentTypeUpdated called with:", type);
    setPaymentType(type);
    console.log("paymentType state in CheckoutStepper:", paymentType);
    if (onPaymentTypeChange) {
      onPaymentTypeChange(type);
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      handleOpen();
      return;
    } else {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep);
      }
    }
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    if (onStepChange) {
      onStepChange(prevStep);
    }
  };

  const handleClearCart = () => {
    handleNext();
    clearCart();
  };

  const handleOpen = () => {
    setOpen(true);
    setCountdown(3);
    setShowButton(false);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    clearInterval(countdownRef.current);
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (onStepChange) {
      onStepChange(nextStep);
    }
  };

  const handleContinue = () => {
    handleClose();
  };

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(countdownRef.current);
      setShowButton(true);
    }
  }, [countdown]);

  return (
    <Box sx={{ width: "100%", color: theme.palette.primary.contrastText }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          color: theme.palette.primary.contrastText,
          "& .MuiStepConnector-line": {
            borderWidth: 3,
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography variant="h5">Thank you for your order!</Typography>
          <Typography variant="body1">
            Your order number is &nbsp;#140396. We have emailed your order
            confirmation and will update you once its shipped.
          </Typography>
          <ButtonGeneric
            label="Go to my dashboard"
            to="/dashboard"
            onClick={handleClearCart}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <AddressForm />}
          {activeStep === 1 && (
            <PaymentForm onPaymentTypeChange={handlePaymentTypeUpdated} />
          )}
          {activeStep === 2 && <ReviewOrderForm paymentType={paymentType} />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 && (
              <ButtonGeneric label="Back" onClick={handleBack} />
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            <ButtonGeneric
              label={
                activeStep === steps.length - 1 ? "Confirm Your Order" : "Next"
              }
              onClick={handleNext}
            />
          </Box>
        </React.Fragment>
      )}
      <Backdrop
        sx={(theme) => ({
          color: theme.palette.primary.contrastText,
          zIndex: theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(62, 47, 100, 0.8)",
        })}
        open={open}
        aria-hidden={!open}
      >
        {!showButton ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
            <Typography variant="body1">
              Transaction initialized... {countdown}s
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body1">Payment completed</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: "400",
                paddingX: { xs: 1, md: 2 },
                paddingY: { xs: 0, md: 1 },
                borderRadius: 8,
                boxShadow: 2,
                whiteSpace: "nowrap",
              }}
            >
              Back to Store
            </Button>
          </>
        )}
      </Backdrop>
    </Box>
  );
}

export default CheckoutStepper;
