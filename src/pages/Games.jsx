import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  RadioGroup,
  FormControl,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import ProductCard from "../components/products/ProductCard";
import SearchInput from "../components/common/SearchInput";
import ProductsData from "../data/products.json";
import GenresData from "../data/genre.json";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
const genres = GenresData.map((genre) => genre.genre_name);

function Games() {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("View All");
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
    const genreParam = searchParams.get("genre");
    if (query) {
      setSearchText(query);
    }
    if (genreParam) {
      setSelectedGenre(genreParam);
    } else {
      setSelectedGenre("View All");
    }
    if (inputRef.current && !query) {
      inputRef.current.focus();
    }
  }, [location.search]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    const searchParams = new URLSearchParams(location.search);
    if (event.target.value !== "View All") {
      searchParams.set("genre", event.target.value);
    } else {
      searchParams.delete("genre");
    }
    navigate(`/games?${searchParams.toString()}`, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    if (selectedGenre === "View All") {
      return ProductsData;
    }
    const lowerSelectedGenre = selectedGenre.toLowerCase();
    return ProductsData.filter((product) => {
      return (
        product.genre_id_1?.toLowerCase() === lowerSelectedGenre ||
        product.genre_id_2?.toLowerCase() === lowerSelectedGenre ||
        product.genre_id_3?.toLowerCase() === lowerSelectedGenre
      );
    });
  }, [selectedGenre]);

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
      {/* Search Bar */}
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

      {/* Genre Selector */}
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Genre options"
          name="gameGenre"
          value={selectedGenre}
          onChange={handleGenreChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 2,
            overflowX: "auto",
          }}
        >
          <GenreSelectorCard value="View All" label="View All" />
          {genres.map((genre) => (
            <GenreSelectorCard key={genre} value={genre} label={genre} />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Product Grid */}
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
        {filteredProducts.map((item) => (
          <ProductCard key={item.product_id} product={item} />
        ))}
      </Box>
    </Box>
  );
}

export default Games;