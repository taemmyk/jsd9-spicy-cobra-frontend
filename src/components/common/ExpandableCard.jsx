import React, { useState, useRef } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  Rating,
} from "@mui/material";
import {
  ContactSupport as ContactSupportIcon,
  CloudDownload as CloudDownloadIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import {
  generateRandomDateAndTime,
  formatDateWithTime,
  generateDatetimeTransaction,
} from "../../utils/getRandomDatetime";

function ExpandableCard({ product, ratingValue, reviewContent }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const orderDatetimeRef = useRef(null);
  const transactionDatetimeRef = useRef(null);

  if (!orderDatetimeRef.current) {
    orderDatetimeRef.current = generateRandomDateAndTime();
    transactionDatetimeRef.current = generateDatetimeTransaction(
      orderDatetimeRef.current
    );
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: theme.palette.background.layout,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <CardMedia
              component="img"
              image={product.image_thumbnail}
              alt={product.title}
              sx={{ height: "auto", maxWidth: "100%" }}
              loading="lazy"
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.accent.default }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.light }}
            >
              ฿{product.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <b>Order No.</b> #1234567
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <b>Order</b> {formatDateWithTime(orderDatetimeRef.current)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <b>Transaction</b>{" "}
              {formatDateWithTime(transactionDatetimeRef.current)}
            </Typography>
          </Grid>
        </Grid>
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
            sx={{ marginBottom: 2, color: theme.palette.secondary.light }}
          >
            Your Review on This Game
          </Typography>
          <Rating
            name="text-feedback"
            value={ratingValue}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography variant="body2">
            {reviewContent
              ? reviewContent
              : "You have not review this game yet."}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ExpandableCard;
