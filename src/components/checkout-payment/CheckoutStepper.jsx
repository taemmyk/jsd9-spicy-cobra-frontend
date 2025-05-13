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
import axios from "../../services/axiosInstance"; // Ensure this path is correct
import { CartContext } from "../contexts/CartContext"; // Ensure this path is correct
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import { generateOrderId } from "../../utils/generateOrder";

const steps = ["Your address", "Payment details", "Review your order"];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300], // Adjusted for better visibility
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
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
    backgroundColor: theme.palette.secondary.light, // Or your preferred active color
    color: theme.palette.secondary.contrastText,
    fontWeight: "900",
    boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`, // Example active shadow
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.secondary.main, // Or your preferred completed color
    color: theme.palette.secondary.contrastText,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  // If you want to display step numbers
  const icons = {
    1: 1,
    2: 2,
    3: 3,
  };
  return (
    <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
      {icons[String(icon)] || icon}
    </ColorlibStepIconRoot>
  );
}

function CheckoutStepper({ onStepChange }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false); // For backdrop
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false); // For "Back to Store" button
  const { items: cartItems, clearCart } = useContext(CartContext);
  const progressRef = useRef(null);
  const previousFocusRef = useRef(null);
  const navigate = useNavigate();
  const [dataForOrdersTab, setDataForOrdersTab] = useState([]); // Renamed from latestOrders for clarity

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    if (onStepChange) {
      onStepChange(prevStep);
    }
  };

  // This function is called when "Go to my dashboard" is clicked AFTER order completion message
  const handleGoToDashboardAndClearCart = () => {
    clearCart(); // Clear cart
    navigate("/dashboard", { state: { orders: dataForOrdersTab } }); // Navigate with potentially stale data if not re-fetched here
    // Or simply navigate("/dashboard") and let OrdersTab always fetch
  };


  const handleNext = async () => {
    if (activeStep === 2) { // "Confirm Your Order" step
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        // TODO: Show user-friendly message about needing to log in
        alert("You need to be logged in to place an order.");
        return;
      }

      // Show processing UI immediately
      setOpen(true); // Open backdrop
      setProgress(0);
      setShowButton(false);
      if (document.activeElement) {
        previousFocusRef.current = document.activeElement;
      }


      try {
        // Step 1: Validate token (User request: "order//get to ask if token is correct")
        // This is an example. Use your actual token validation endpoint and logic.
        // If GET /orders itself serves as a validation (fails on bad token), that's also an option.
        // A lightweight endpoint like /auth/validate-token or /users/me is often preferred.
        console.log("Validating token...");
        try {
          // Assuming a GET to /orders would fail for an invalid token,
          // or you have a specific endpoint like /auth/me or /validate-token
          await axios.get("/orders", { // REPLACE with your actual validation endpoint if different
            headers: { Authorization: `Bearer ${token}` },
            // params: { limit: 1 } // Make it a lightweight call if /orders returns many
          });
          console.log("Token appears valid.");
        } catch (validationError) {
          console.error("Token validation failed:", validationError);
          setOpen(false); // Close backdrop
          // TODO: Show user-friendly error (e.g., session expired, please log in again)
          alert("Your session may have expired. Please log in again.");
          return; // Stop the process
        }
        if (!Array.isArray(cartItems)) {
          console.error("cartItems is not an array:", cartItems);
          alert("There was a problem with your cart. Please try again.");
          return;
        }

        // POST order (Step 2)
        const orderRes = await axios.post(
          "/orders",
          {
            product_id: cartItems.map(item => item._id), // optional
            total_price: cartItems.reduce((acc, item) => acc + item.price, 0),
            order_id: generateOrderId(), // หรือ backend สร้างให้ก็ได้
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const orderId = orderRes.data._id; // ใช้อันนี้สำหรับ order_items

        // POST each order item (Step 3)
        await Promise.all(
          cartItems.map((item) =>
            axios.post("/order_items", {
              order_id: orderId,
              product_id: item._id,
              order_line_id: generateOrderId(),
              sell_price: item.sell_price || item.price,
              product: {
                product_id: item.product_id || item._id,
                title: item.title,
                image_thumbnail: item.image_thumbnail,
                price: item.price,
                description: item.description ,
              },
              ratingValue: item.ratingValue ,
              reviewContent: item.reviewContent ,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );


        // UI update: Advance stepper to "Thank you" message stage (handled by Backdrop's button)
        // The actual activeStep update to show "Thank you" will happen via handleContinue/handleClose
        // For now, manage the progress bar until completion.
        setActiveStep(activeStep + 1); // Move to the "Thank you" placeholder step
        if (onStepChange) {
          onStepChange(activeStep + 1);
        }


        // Start progress bar simulation
        progressRef.current = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 100) {
              clearInterval(progressRef.current);
              setShowButton(true); // Show "Back to Store" (or "Continue") button on Backdrop
              return 100;
            }
            const diff = Math.random() * 15 + 5; // Ensure some progress
            return Math.min(oldProgress + diff, 100);
          });
        }, 200);

      } catch (error) {
        console.error("Error during order submission process:", error.response?.data || error.message);
        setOpen(false); // Close backdrop on error
        // TODO: Show specific error message to the user based on error type
        alert("There was an issue submitting your order. Please try again.");
        // Do not advance activeStep, stay on "Review Your Order"
      }
    } else { // For steps other than "Confirm Your Order"
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep);
      }
    }
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
    clearInterval(progressRef.current);
    // This function is primarily for closing the backdrop if clicked away,
    // or if an action on the backdrop (like "Back to Store") is taken.
    // If the order was successful, activeStep would have been advanced.
    // We navigate from the button on the backdrop.
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const handleContinueToDashboard = () => {
    handleCloseBackdrop(); // Close backdrop
    clearCart(); // Clear cart items from context
    navigate("/dashboard", { state: { orders: dataForOrdersTab } }); // Pass fetched order items
  };


  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      clearInterval(progressRef.current);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", color: theme.palette.primary.contrastText }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel // Or remove if you prefer icons above text
        sx={{
          padding: theme.spacing(3, 0), // Add some padding
          "& .MuiStepConnector-line": {
            borderTopWidth: 3,
            borderColor: theme.palette.secondary.main, // Or another color
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            {/* Pass index + 1 for 1-based icon numbers if ColorlibStepIcon expects that */}
            <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} icon={index + 1} />}>
              {label} {/* Display step label */}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? ( // This is the "Thank You" / post-order processing stage
        // This content is now effectively shown within the Backdrop or after it closes.
        // The primary "Thank You" message will be on the Backdrop when progress is 100%.
        // After closing backdrop and navigating, this part of stepper won't be visible.
        // Let's keep a simple message here if needed before navigation or if backdrop is closed early.
        <Fragment>
          <Typography variant="h5" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
            Processing Complete!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            You will be redirected shortly, or click the button in the confirmation pop-up.
          </Typography>
          {/* Button to go to dashboard is now on the backdrop */}
        </Fragment>
      ) : (
        <Fragment>
          {activeStep === 0 && <AddressForm />}
          {activeStep === 1 && <PaymentForm />}
          {activeStep === 2 && <ReviewOrderForm />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 3, pb: 2 }}>
            <ButtonGeneric
              label="Back"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ mr: 1 }} // Add some margin if ButtonGeneric doesn't have it
            />
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
          color: theme.palette.common.white, // Ensure text is visible on backdrop
          zIndex: theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker backdrop
        })}
        open={open}
      // onClick={handleCloseBackdrop} // Optional: close on clicking away, but button is better UX
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.paper, // Give it a paper background
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary, // Text color for content inside this box
          }}
        >
          {!showButton ? (
            <>
              <Typography variant="h6" gutterBottom>
                Processing Your Order
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                color="secondary" // Use theme color
                sx={{ width: "100%", height: '10px', borderRadius: '5px', mb: 2 }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Please wait a moment...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom sx={{ color: "green", fontWeight: "bold" }}>
                Payment Completed! {/* Or Order Confirmed! */}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Your order has been successfully processed. <br />
                Order No: #140396 (Replace with dynamic order number if available)
              </Typography>
              <Button
                variant="contained"
                color="primary" // Or "secondary"
                onClick={handleContinueToDashboard}
                size="large"
                sx={{
                  padding: theme.spacing(1.5, 4),
                  borderRadius: theme.shape.borderRadius * 2,
                }}
              >
                Go to My Orders
              </Button>
            </>
          )}
        </Box>
      </Backdrop>
    </Box>
  );
}
export default CheckoutStepper;