import React, { useState } from "react";
import { Typography, IconButton, Tooltip, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import calculateSalePrice from "../../utils/calculateSalePrice";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

function CartItemCard({ product, onRemove }) {
  const theme = useTheme();
  const currentPrice = calculateSalePrice(product);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    setShouldAnimate(true);
    setTimeout(() => {
      onRemove(product.product_id);
    }, 400);
  };

  const animationVariants = {
    initial: { opacity: 1, translateX: 0 },
    animate: {
      opacity: 0,
      translateX: -300,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: theme.palette.background.card,
        paddingX: 3,
        paddingY: 2,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        justifyItems: "start",
      }}
    >
      <MotionBox
        sx={{
          gridColumn: "1 / 3",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
        variants={animationVariants}
        initial="initial"
        animate={shouldAnimate ? "animate" : "initial"}
      >
        <Typography variant="body3" fontWeight="semibold">
          {product.title}
        </Typography>
        <Typography variant="body3" fontWeight="semibold">
          ฿{product.price}
        </Typography>
      </MotionBox>

      <Tooltip title="Delete">
        <IconButton
          onClick={handleRemoveClick}
          size="small"
          sx={{
            position: "absolute",
            top: -10,
            right: -5,
            bgcolor: "rgba(95, 35, 42, 0.7)",
            color: theme.palette.primary.contrastText,
            zIndex: 1,
            "&:hover": {
              bgcolor: "rgba(95, 35, 42, 0.9)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CartItemCard;
