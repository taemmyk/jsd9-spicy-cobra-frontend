import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Typography,
  RadioGroup,
  FormControl,
  IconButton,
  Box,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductCard from "../components/products/ProductCard";
import Heading from "../components/common/Heading";
import SearchInput from "../components/common/SearchInput";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SelectorCard from "../components/common/SelectorCard";
import { motion, useAnimate } from "framer-motion";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchGenres from "../hooks/useFetchGenres";
import useDebounce from "../hooks/useDebounce";

const MotionBox = motion.create(Box);

function Games() {
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
  const searchTimeoutRef = useRef(null);
  const debouncedSearchText = useDebounce(searchText, 1000);

const {
  products,
  allProducts,
  loading: loadingProducts,
  error: errorProducts,
} = useFetchProducts(debouncedSearchText);

  const {
    genres,
    loading: loadingGenres,
    error: errorGenres,
  } = useFetchGenres();

  const updateQuery = useCallback(
    (newParams) => {
      const searchParams = new URLSearchParams(location.search);
      for (const key in newParams) {
        if (newParams[key]) {
          searchParams.set(key, newParams[key]);
        } else {
          searchParams.delete(key);
        }
      }
      navigate(`/games?${searchParams.toString()}`, { replace: true });
    },
    [location.search, navigate]
  );

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearInput = () => {
    setSearchText("");
    updateQuery({ search: null, genre: null });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleGenreChange = (event) => {
    const newGenre = event.target.value;
    setSelectedGenre(newGenre);
    setAnimateDescription(true);
    updateQuery({
      genre: newGenre !== "View All" ? newGenre : null,
      search: searchText || null,
    });
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      updateQuery({
        search: searchText || null,
        genre: selectedGenre !== "View All" ? selectedGenre : null,
      });
    }, 2000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText, selectedGenre, updateQuery]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");
    const genreNameParam = searchParams.get("genre");
    if (query) {
      setSearchText(query);
      setSelectedGenre(genreNameParam || "View All");
    } else if (genreNameParam) {
      setSelectedGenre(genreNameParam);
    } else {
      setSelectedGenre("View All");
    }
    if (inputRef.current && !query) {
      inputRef.current.focus();
    }
  }, [location.search]);

  useEffect(() => {
    if (animateDescription && genres && genres.length > 0) {
      animate(scope.current, { y: [0, 40], opacity: [1, 0] }, { duration: 0.2 }).then(() => {
        const selectedGenreData = genres.find(
          (genre) => genre.genreName === selectedGenre
        );
        setDescription(
          selectedGenre === "View All"
            ? "Explore a wide variety of your next favorite games across different genres!"
            : selectedGenreData?.genreDescription ||
              `Information about the ${selectedGenre} genre will be displayed here.`
        );
        animate(scope.current, { y: [40, 0], opacity: [0, 1] }, { duration: 0.2 }).then(() =>
          setAnimateDescription(false)
        );
      });
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [animateDescription, selectedGenre, animate, scope, genres]);

  const filteredProducts = useMemo(() => {
    if (selectedGenre === "View All") return products;

    const selectedGenreObj = genres.find(
      (genre) => genre.genreName === selectedGenre
    );
    if (!selectedGenreObj) return products;

    return products.filter((product) =>
      product.genres.includes(selectedGenreObj._id)
    );
  }, [products, selectedGenre, genres]);

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.card }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "auto", md: "50vh" },
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
          <Box sx={{ paddingX: 2 }}>
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
                handleSearchSubmit={(e) => e.preventDefault()}
                sx={{ mx: 2, flexGrow: 1 }}
              />
              <IconButton
                onClick={handleClearInput}
                disabled={!searchText}
                sx={{ p: 1 }}
              >
                <ClearIcon
                  sx={{
                    width: { xs: 28, md: 40 },
                    height: { xs: 28, md: 40 },
                    color: searchText
                      ? theme.palette.secondary.light
                      : theme.palette.background.paper,
                  }}
                />
              </IconButton>
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
                    key={genre._id}
                    value={genre.genreName}
                    label={genre.genreName}
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
      <Container maxWidth="xl">
        {loadingProducts ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, md: 4 },
              margin: 4,
            }}
          >
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default Games;
