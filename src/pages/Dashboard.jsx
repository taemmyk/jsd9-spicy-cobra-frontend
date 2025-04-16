import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Heading from "../components/common/Heading";
import SearchInput from "../components/common/SearchInput";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import RadioGroupCard from "../components/common/RadioGroupCard";
import ButtonGeneric from "../components/common/ButtonGeneric";

function Dashboard() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [orderType, setOrderType] = useState("");
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
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          height: "auto",
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <RadioGroupCard
            cardType="orderStatus"
            value="orderStatus"
            label="Dashboard"
            onClick={setOrderType}
          />
          <RadioGroupCard
            cardType="orderStatus"
            value="orderStatus"
            label="My Order"
            onClick={setOrderType}
          />
          <RadioGroupCard
            cardType="orderStatus"
            value="orderStatus"
            label="Follower"
            onClick={setOrderType}
          />
          <RadioGroupCard
            cardType="orderStatus"
            value="orderStatus"
            label="Publish"
            onClick={setOrderType}
            sx={{ backgroundColor: theme.palette.accent.emphasis }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            padding: 2,
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            gap: 4,
          }}
        ></Box>

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ backgroundColor: theme.palette.background.card }}>
                <ButtonGeneric label="Publish your new game" sx={{ marginY: 2 }} />
              </Box>
            </Box>
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
              display: "flex",
              width: "100%",
              backgroundColor: "lightgreen",
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Games
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
