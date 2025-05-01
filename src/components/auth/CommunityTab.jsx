import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  useTheme,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import productsData from "../../data/products.json";
import genresData from "../../data/genre.json";

function CommunityTab() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 4 }}>
        <Heading section="Community Engagement" />
      </Box>
    </>
  );
}

export default CommunityTab;
