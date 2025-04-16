import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

function OrderItemCard({
  title,
  edition,
  productImagePath,
  price,
  isEditable = false,
}) {
  const theme = useTheme();
  return (
    <Box
      className="item-entry-card"
      sx={{
        display: "grid",
        gridTemplateColumns: isEditable ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
        placeItems: "center",
        backgroundColor: "background.card",
        borderRadius: 4,
      }}
    >
      <Box
        component="img"
        src={productImagePath}
        alt={title}
        sx={{
          display: { xs: "none", md: "block" },
          maxWidth: "150px",
          height: "auto",
        }}
      />
      <Box
        className="item-detail-container"
        sx={{
          gridColumn: { xs: "span 2", md: "span 2" },
          display: "flex",
          flexDirection: "column",
          p: { xs: 1, md: 0 },
        }}
      >
        <Typography variant="body1" fontWeight="semibold">
          {title}
        </Typography>
        <Typography variant="body2">{edition}</Typography>
      </Box>
      <Typography variant="body1" fontWeight="semibold">
        THB{price}
      </Typography>
      {isEditable && (
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
      )}
    </Box>
  );
}

export default OrderItemCard;
