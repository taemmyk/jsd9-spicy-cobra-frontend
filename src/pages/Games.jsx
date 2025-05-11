import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Typography,
  RadioGroup,
  FormControl,
  IconButton,
  Box,
  Paper,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductCard from "../components/products/ProductCard";
import Heading from "../components/common/Heading";
import SearchInput from "../components/common/SearchInput";
// import ProductsData from "../data/products.json";
import GenresData from "../data/genre.json";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SelectorCard from "../components/common/SelectorCard";
import { motion, useAnimate } from "framer-motion";
import axios from "../services/axiosInstance"


const MotionBox = motion.create(Box);
const genres = GenresData.map((genre) => genre.genre_name);

function Games() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("View All");
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState(
    "Explore a wide variety of your next favorite games across different genres!"
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
            ? "Explore a wide variety of your next favorite games across different genres!"
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.card }}>
        <Container maxWidth="xl">
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
        </Container>
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              paddingX: 2,
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
                <SelectorCard
                  key="View All"
                  value="View All"
                  label="View All"
                  selectedType={selectedGenre}
                  handleTypeChange={handleGenreChange}
                />
                {genres.map((genre) => (
                  <SelectorCard
                    key={genre}
                    value={genre}
                    label={genre}
                    selectedType={selectedGenre}
                    handleTypeChange={handleGenreChange}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Container>
      </Box>
      {/* Product Grid */}
      {/* Product Grid */}
<Container maxWidth="xl">
  {loading ? (
    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
      Loading products...
    </Typography>
  ) : error ? (
    <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
      {error}
    </Typography>
  ) : (
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
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </Box>
  )}
</Container>

    </>
  );
}

export default Games;
