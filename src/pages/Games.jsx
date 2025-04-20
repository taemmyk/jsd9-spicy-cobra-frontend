import React, { useState, useRef, useEffect } from "react";
import ButtonGeneric from "../components/common/ButtonGeneric";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SearchInput from "../components/common/SearchInput"; // Adjust path as needed
import { IconButton, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Games() {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("viewall");

  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    navigate(`/search?search=${encodeURIComponent(newValue)}`, {
      replace: true,
    });
  };

  const handleClearInput = () => {
    setSearchText("");
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");
    navigate(
      `/games${searchParams.toString() ? "?" + searchParams.toString() : ""}`,
      { replace: true }
    );
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");
    if (query) {
      setSearchText(query);
    }
    if (inputRef.current && !query) {
      inputRef.current.focus();
    }
  }, [location.search]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    const searchParams = new URLSearchParams(location.search);
    if (event.target.value !== "viewall") {
      searchParams.set("genre", event.target.value);
    } else {
      searchParams.delete("genre");
    }
    navigate(`/games?${searchParams.toString()}`, { replace: true });
  };

  const GenreSelectorCard = ({ value, label }) => (
    <Card
      selected={selectedGenre === value}
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={() => handleGenreChange({ target: { value } })}
        sx={{
          "&:hover": {
            "& .MuiTypography-root": {
              color:
                selectedGenre === value
                  ? theme.palette.accent.dark
                  : theme.palette.primary.contrastText,
              fontWeight: "500",
            },
            "& svg": {
              color:
                selectedGenre === value
                  ? theme.palette.accent.dark
                  : theme.palette.primary.contrastText,
            },
          },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsEsportsIcon
            fontSize="small"
            sx={{
              color:
                selectedGenre === value
                  ? theme.palette.accent.dark
                  : theme.palette.background.default,
            }}
          />
          <Typography
            sx={{
              fontWeight: selectedGenre === value ? "500" : "400",
              paddingRight: 3,
              color:
                selectedGenre === value
                  ? theme.palette.accent.dark
                  : theme.palette.primary.contrastText,
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 1, md: 4 },
          mb: 2,
        }}
      >
        <SearchIcon
          sx={{
            width: { xs: 28, md: 40 },
            height: { xs: 28, md: 40 },
            color: theme.palette.secondary.light,
          }}
        />
        <SearchInput
          isSearchOpen={true}
          searchText={searchText}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleSearchSubmit={handleSearchSubmit}
          sx={{ mx: 2, flexGrow: 1 }}
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
      </Box>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Genre options"
          name="gameGenre"
          value={selectedGenre}
          onChange={handleGenreChange}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 2,
          }}
        >
          <GenreSelectorCard value="viewall" label="View all" />
          <GenreSelectorCard value="action" label="Action" />
          <GenreSelectorCard value="adventure" label="Adventure" />
          <GenreSelectorCard value="puzzle" label="Puzzle" />
        </RadioGroup>
      </FormControl>

      <Typography variant="body1">{`Selected Genre: ${selectedGenre}`}</Typography>
      {searchText && (
        <Typography variant="body1">{`Search Text: ${searchText}`}</Typography>
      )}
    </Box>
  );
}

export default Games;
