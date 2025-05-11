import React, { useState, useEffect, useRef } from "react";
import axios from "../../services/axiosInstance"
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../../components/common/Heading";
import SearchInput from "../../components/common/SearchInput";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

function DashboardTab() {
  const theme = useTheme();
  const location = useLocation();
  const orders = location.state?.orders || [];
  const [searchText, setSearchText] = useState("");
  const [games, setGames] = useState([]); 

  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearInput = () => {
    setSearchText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
   
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products"); 
        setGames(res.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 2,
        backgroundColor: theme.palette.background.paper,
        padding: 2,
        alignItems: "center",
        gap: 4,
        borderRadius: 4,
        marginY: 2,
      }}
    >
      <Heading section="Welcome user!" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Heading section="Game Library" />
        <Box sx={{ display: "flex" }}>
          <SearchInput
            isSearchOpen={true}
            searchText={searchText}
            handleInputChange={handleInputChange}
            handleSearchSubmit={handleSearchSubmit}
            sx={{ backgroundColor: theme.palette.secondary.light }}
          />
          {searchText && (
            <IconButton onClick={handleClearInput} sx={{ p: 1 }}>
              <ClearIcon
                sx={{
                  width: { xs: 28, md: 40 },
                  height: { xs: 28, md: 40 },
                  color: theme.palette.secondary.light,
                }}
              />
            </IconButton>
          )}
          <IconButton sx={{ p: 1 }}>
            <SearchIcon
              sx={{
                width: { xs: 28, md: 40 },
                height: { xs: 28, md: 40 },
                color: theme.palette.secondary.light,
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: {
            xs: 2,
            md: 4,
          },
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        {games.map((game, index) => (
          <Card key={index} sx={{ borderRadius: 4 }}>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  image={game.image_thumbnail}
                  alt={game.title}
                  sx={{ width: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  backgroundColor: theme.palette.background.card,
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    alt={game.developer}
                    src={game.developer_avatar}
                    sx={{ width: 48, height: 48, objectFit: "cover" }}
                  />
                  <Typography variant="body3">{game.developer}</Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        
      </Box>
    </Box>
  );
}

export default DashboardTab;
