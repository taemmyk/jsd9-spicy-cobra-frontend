import * as React from "react";
import { styled } from "@mui/material/styles";
import { Card, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Typography, useTheme, Box } from "@mui/material"; // Import Box ด้วย
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
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

function ExpandableCard({ product }) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

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
              Order
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Transaction
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
          expand={expanded}
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
          <Typography variant="body2">
            You have not review this game yet.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ExpandableCard;
