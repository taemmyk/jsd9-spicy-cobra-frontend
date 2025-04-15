import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ButtonCta from "../common/ButtonCta";

const steps = ["Your address", "Payment details", "Review you order"];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[300],
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

function LinearStepper() {
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
        sx={{ color: theme.palette.primary.contrastText }}
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
          <ButtonCta label="Go to my dashboard" to="/" />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
            sx={{ mt: 2, mb: 1, color: theme.palette.primary.contrastText }}
          >
            Step {activeStep + 1}
          </Typography>
          {activeStep === 0 && <AddressForm />}
          {activeStep === 1 && <PaymentForm />}
          {activeStep === 2 && (
            <Typography
              sx={{ mt: 2, mb: 1, color: theme.palette.primary.contrastText }}
            >
              Review Your Order Details Here
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <ButtonCta
              label="Back"
              onClick={handleBack}
              disabled={activeStep === 0}
            />
            <Box sx={{ flex: "1 1 auto" }} />
            <ButtonCta
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

export default LinearStepper;
