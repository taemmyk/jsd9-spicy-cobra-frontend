import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  useTheme,
  styled,
  Divider,
} from "@mui/material";

import OrderItemReviewCard from "./OrderItemReviewCard";

function ReviewOrderForm() {
  const theme = useTheme();
  return (
    <>
      <Typography
        sx={{ mt: 2, mb: 1, color: theme.palette.primary.contrastText }}
      >
        Review Your Order Details Here
      </Typography>

      <OrderItemReviewCard
        category="Products"
        description="2 games"
        total="THB1,380"
      />
      <OrderItemReviewCard
        category="Tax"
        description="7% Vat include"
        total="THB100"
      />
      <OrderItemReviewCard category="Total" total="THB1,380" />
      <Divider
        sx={{
          borderColor: theme.palette.secondary.main,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Typography variant="body1" fontWeight="semibold">
          Payment method
        </Typography>
        <Typography variant="body2">Credit card</Typography>
      </Box>
    </>
  );
}

export default ReviewOrderForm;
