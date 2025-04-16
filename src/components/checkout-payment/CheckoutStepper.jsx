import * as React from "react";
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
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.light,
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

function CheckoutStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        <React.Fragment>
          <Typography variant="h5">Thank you for your order!</Typography>
          <Typography variant="body1">
            Your order number is
            <strong>&nbsp;#140396</strong>. We have emailed your order
            confirmation and will update you once its shipped.
          </Typography>
          <ButtonGeneric label="Go to my dashboard" to="/dashboard" />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <AddressForm />}
          {activeStep === 1 && <PaymentForm />}
          {activeStep === 2 && <ReviewOrderForm />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 && <ButtonGeneric label="Back" onClick={handleBack} />}
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
    </Box>
  );
}

export default CheckoutStepper;
