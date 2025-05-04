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
  Paper,
  useTheme,
} from "@mui/material";
import ProductCard from "../components/products/ProductCard";
import Heading from "../components/common/Heading";
import SearchInput from "../components/common/SearchInput";
import ProductsData from "../data/products.json";
import GenresData from "../data/genre.json";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { motion, useAnimate } from "framer-motion";
const MotionBox = motion.create(Box);
const genres = GenresData.map((genre) => genre.genre_name);

function Games() {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("View All");
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState(
    "Explore a wide variety of exciting games across different genres. Use the filters below to narrow down your search and discover your next favorite adventure!"
  );
  const [animateDescription, setAnimateDescription] = useState(false);
  const [scope, animate] = useAnimate();

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
    const newGenre = event.target.value;
    setSelectedGenre(newGenre);
    setAnimateDescription(true);

    const searchParams = new URLSearchParams(location.search);
    if (newGenre !== "View All") {
      searchParams.set("genre", newGenre);
    } else {
      searchParams.delete("genre");
    }
    navigate(`/games?${searchParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    if (animateDescription) {
      animate(
        scope.current,
        { y: [0, 40], opacity: [1, 0] },
        { duration: 0.2 }
      ).then(() => {
        const selectedGenreData = GenresData.find(
          (genre) => genre.genre_name === selectedGenre
        );
        setDescription(
          selectedGenre === "View All"
            ? "Explore a wide variety of exciting games across different genres. Use the filters below to narrow down your search and discover your next favorite adventure!"
            : selectedGenreData?.description ||
                `Information about the ${selectedGenre} genre will be displayed here.`
        );
        animate(
          scope.current,
          { y: [40, 0], opacity: [0, 1] },
          { duration: 0.2 }
        ).then(() => setAnimateDescription(false));
      });
    }
  }, [animateDescription, selectedGenre, animate, scope]);

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
                  : theme.palette.background.contrastText,
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
                  : theme.palette.background.paper,
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
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: "auto",
            md: "50vh",
          },
          objectFit: "cover",
          objectPosition: "center",
        }}
      >
        <Box
          component="img"
          src="https://i.pcmag.com/imagery/roundups/025NJmKivEPIxXC9veZnSFP-6.fit_lim.size_1600x900.v1736540192.jpg"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          loading="lazy"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(30, 27, 45, 0.8)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MotionBox
            ref={scope}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                maxWidth: "60%",
                textAlign: "center",
                color: theme.palette.secondary.light,
              }}
            >
              {description}
            </Typography>
          </MotionBox>
        </Box>
      </Box>

      <Box
        sx={{
          paddingX: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Paper elevation={3} />
        <Heading section="Games" />
        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: { xs: 1, md: 4 },
            paddingTop: 2,
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
      </Box>

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
          margin: 4,
        }}
      >
        {filteredProducts.map((item) => (
          <ProductCard key={item.product_id} product={item} />
        ))}
      </Box>
    </>
  );
}

export default Games;
