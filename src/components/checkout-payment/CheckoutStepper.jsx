import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  styled,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ButtonGeneric from "../common/ButtonGeneric";
import ReviewOrderForm from "./ReviewOrderForm";

import { CartContext } from "../contexts/CartContext";
import {
  calculateSalePrice,
  calculateOrderTotalPrice,
} from "../../utils/calculatePrice";
import Backdrop from "@mui/material/Backdrop";

import api from "../../services/api";

const steps = ["Your address", "Payment details", "Review you order"];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  zIndex: 1,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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

function CheckoutStepper({ onStepChange }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const {
    clearCart,
    items: cartItems,
    paymentMethod,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const progressRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [orderId, setOrderId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleNext = () => {
    if (activeStep === 2) {
      previousFocusRef.current = document.activeElement;
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
    handleConfirmOrder();
    previousFocusRef.current = document.activeElement;
    setOpen(true);
    setProgress(0);
    setShowButton(false);

    progressRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(progressRef.current);
          setShowButton(true);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);
  };

  const handleClose = () => {
    setOpen(false);
    clearInterval(progressRef.current);
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (onStepChange) {
      onStepChange(nextStep);
    }
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const handleContinue = async () => {
    handleClose();
    if (orderId) {
      try {
        const patchResponse = await api.patch(`/orders/${orderId}`, {
          orderStatus: "Paid",
        });
        console.log("Order patched successfully:", patchResponse.data);
      } catch (error) {
        console.error("Error patching order:", error);
      }
    } else {
      console.warn("Order ID is not available, cannot patch.");
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(progressRef.current);
    };
  }, []);

  const handleConfirmOrder = async () => {
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item._id,
          sellPrice: calculateSalePrice(item),
        })),
        totalPrice: calculateOrderTotalPrice(cartItems),
        paymentMethod: paymentMethod,
      };
      console.log(JSON.stringify(orderData, null, 2));

      const response = await api.post("/orders", orderData);

      if (response.status === 200 || response.status === 201) {
        console.log("Order created successfully:", response.data);
        setOrderId(response.data.data._id);
        setOrderNumber(response.data.data.orderNumber);
      } else {
        console.error("Error creating order:", response.data);
      }
    } catch (error) {
      console.error("Error calling create order API:", error);
    }
  };

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
        <Fragment>
          <Typography variant="h5" sx={{ paddingY: 4 }}>
            Thank you for your order!
          </Typography>

          <Typography variant="body1">
            Your order number is &nbsp;#{orderNumber}.
          </Typography>
          <Typography variant="body2" sx={{ paddingBottom: 4 }}>
            We have emailed your order confirmation.
          </Typography>
          <ButtonGeneric
            label="Go to my dashboard"
            to="/dashboard"
            onClick={handleClearCart}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          {activeStep === 0 && <AddressForm />}
          {activeStep === 1 && <PaymentForm />}
          {activeStep === 2 && <ReviewOrderForm />}
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
        </Fragment>
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
        onClick={handleClose}
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!showButton ? (
            <>
              <LinearProgress
                variant="determinate"
                value={progress}
                color="inherit"
                sx={{ width: "100%" }}
              />
              <Typography variant="body2" sx={{ mt: 1, color: "inherit" }}>
                Processing transaction...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: "inherit", mb: 2 }}>
                Payment completed
              </Typography>
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
                  backgroundColor: theme.palette.secondary.dark,
                }}
              >
                Back to Store
              </Button>
            </>
          )}
        </Box>
      </Backdrop>
    </Box>
  );
}

export default CheckoutStepper;
