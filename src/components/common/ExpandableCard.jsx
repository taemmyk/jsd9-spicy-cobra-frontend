import React, { useState, useRef } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ErrorIcon from "@mui/icons-material/Error";

function ExpandableCard({ order }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return (
          <CheckCircleIcon sx={{ color: theme.palette.accent.dark, mr: 0.5 }} />
        );
      case "Pending":
        return (
          <ErrorIcon sx={{ color: theme.palette.accent.emphasis, mr: 0.5 }} />
        );
      case "Cancelled":
        return (
          <CancelIcon sx={{ color: theme.palette.negative.default, mr: 0.5 }} />
        );
      default:
        return null;
    }
  };

  const statusIcon = getStatusIcon(order.orderStatus);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: theme.palette.background.layout,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ color: theme.palette.accent.default }}>
          #{order.orderNumber} {statusIcon}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.secondary.light }}
        >
          ฿{order.totalPrice.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          <b>Order Date:</b> {new Date(order.orderAt).toLocaleString()}
        </Typography>
        {order.orderStatus === "Paid" && (
          <>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <b>Paid Date:</b>{" "}
              {new Date(order.transactionAt).toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <b>Payment method:</b> {order.paymentMethod}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon sx={{ color: theme.palette.secondary.light }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton aria-label="download">
            <CloudDownloadIcon sx={{ color: theme.palette.secondary.light }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Contact support">
          <IconButton aria-label="contact-support">
            <ContactSupportIcon sx={{ color: theme.palette.secondary.light }} />
          </IconButton>
        </Tooltip>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest,
            }),
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ExpandMoreIcon sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.secondary.light, paddingBottom: 1 }}
          >
            Order items
          </Typography>
          {order.items &&
            order.items.map((item) => (
              <Box
                key={item._id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{item.product.title}</Typography>
                <Typography>{item.sellPrice.toFixed(2)}</Typography>
              </Box>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ExpandableCard;
