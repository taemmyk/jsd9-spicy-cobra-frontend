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
  CardActions,
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
import ExpandableCard from "../common/ExpandableCard";

function OrdersTab() {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 4, width: "100%" }}>
        <Heading section="Your order" />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
          <ExpandableCard product={productsData[0]}/>
          <ExpandableCard product={productsData[2]}/>
        </Box>
      </Box>
    </>
  );
}

export default OrdersTab;
