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
  styled,
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

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

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
          <Grid sx={{ display: { xs: "none", sm: "block" } }}>
            <CardMedia
              component="img"
              image={product.image_thumbnail}
              alt={product.title}
              sx={{ height: "auto", maxWidth: "100%" }}
            />
          </Grid>
          <Grid>
            <Typography
              variant="body2"
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
              Order {formatDateWithTime(orderDatetimeRef.current)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Transaction {formatDateWithTime(transactionDatetimeRef.current)}
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
        <ExpandMore
          expand={expanded.toString()}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: theme.palette.secondary.light }} />
        </ExpandMore>
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
