import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Heading from "../components/common/Heading";
import { useTheme } from "@mui/material/styles";
import ButtonGeneric from "../components/common/ButtonGeneric";
import OrderItemReviewCard from "../components/checkout-payment/OrderItemReviewCard";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function Order({ onCloseDrawer }) {
  const theme = useTheme();

  const OrderButtonSmall = ({ label, to, onClick }) => {
    const buttonSx = {
      bgcolor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      fontSize: { xs: "1rem", md: "1.25rem" },
      fontWeight: "400",
      paddingX: 1,
      paddingY: 0,
      borderRadius: 8,
      boxShadow: 2,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      "&:hover": {
        bgcolor: theme.palette.secondary.dark,
        color: theme.palette.primary.contrastText,
      },
    };

    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={buttonSx} onClick={onClick}> {/* Use onClick */}
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column", padding: 2, gap: 2}}>
          <Heading section="Your Order" />
          <OrderButtonSmall label="Continue Shopping" onClick={onCloseDrawer} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              placeItems: "center",
              backgroundColor: theme.palette.background.card,
              padding: 2,
            }}
          >
            <Typography
              variant="body3"
              fontWeight="semibold"
              sx={{ gridColumn: "span 2" }}
            >
              Home Sweet Home: Survive
            </Typography>
            <Typography variant="body3" fontWeight="semibold">
              THB690
            </Typography>
            <Tooltip title="Delete">
              <IconButton
                sx={{
                  color: theme.palette.negative.default,
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: "20px",
        }}
      >
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
        <OrderButtonSmall label="Continue to Checkout" to="/checkout" />
      </Box>
    </>
  );
}

export default Order;
