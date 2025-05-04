import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PropTypes from 'prop-types';

function DevLogCard({ logItem }) {
  const theme = useTheme();
  return (
    <Card sx={{ borderRadius: 4 }}>
      <Box>
        <CardMedia
          component="img"
          height="196"
          image={logItem.imageUrl}
          alt={logItem.altText}
          sx={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            objectFit: "cover",
            width: "100%",
          }}
          loading="lazy"
        />
      </Box>
      <CardContent
        sx={{
          padding: 2,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <LocalOfferIcon
            sx={{ fontSize: 16, color: theme.palette.accent.emphasis }}
          />
          <Typography variant="devlogTag">{logItem.tag}</Typography>
        </Stack>
        <Typography variant="h5">{logItem.title}</Typography>
        <Typography variant="body2">{logItem.gameCollection}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Avatar
            alt={logItem.developerName}
            src={logItem.developerAvatarUrl}
            sx={{ width: 52, height: 52, objectFit: "cover" }}
          />
          <Typography variant="body1">{logItem.developerName}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

DevLogCard.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    developerAvatarUrl: PropTypes.string.isRequired,
    developerName: PropTypes.string.isRequired,
  }).isRequired,
};

export default DevLogCard;