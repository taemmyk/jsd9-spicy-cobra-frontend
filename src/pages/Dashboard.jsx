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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            padding: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
            }}
          >
            <RadioGroupCard
              cardType="orderStatus"
              value="orderStatus"
              label="Dashboard"
              onClick={setOrderType}
            />
            <RadioGroupCard
              cardType="orderStatus"
              value="orderStatus"
              label="My Order History"
              onClick={setOrderType}
            />
            <RadioGroupCard
              cardType="orderStatus"
              value="orderStatus"
              label="Profile"
              onClick={setOrderType}
            />
            <ButtonGeneric label="Publish your new game" />
            <ButtonGeneric
              label="Sign out"
              sx={{
                backgroundColor: theme.palette.negative.default,
                color: theme.palette.primary.contrastText,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: theme.palette.background.paper,
              borderRadius: 4,
              width: "100%",
              height: "500px",
            }}
          >
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
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 4,
                  flexGrow: 1,
                }}
              >
                <Box
                  component="img"
                  src="https://placehold.co/200x200"
                  alt=""
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <Box
                  component="img"
                  src="https://placehold.co/200x200"
                  alt=""
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
