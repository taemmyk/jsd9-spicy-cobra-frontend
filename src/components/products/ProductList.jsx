import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import ProductCard from "./ProductCard";
import productsData from "../../data/products.json";
import { Box, Typography } from "@mui/material";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchText !== searchQuery) {
      setSearchText(searchQuery);
    }
  }, [searchQuery, searchText]);

  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return productsData;

    const lowerSearch = searchText.toLowerCase().trim();

    return productsData.filter((product) =>
      [
        product.title,
        product.genre_id_1,
        product.genre_id_2,
        product.genre_id_3,
        product.developer,
        product.publisher,
      ]
        .filter((field) => typeof field === "string")
        .some((field) => field.toLowerCase().includes(lowerSearch))
    );
  }, [searchText]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchText(newQuery);
    navigate(`/search?search=${encodeURIComponent(newQuery)}`, {
      replace: true,
    });
  };

  return (
    <Box>
      <SearchInput
        isSearchOpen={true}
        searchText={searchText}
        handleInputChange={handleInputChange}
        handleSearchSubmit={(e) => e.preventDefault()}
        sx={{ mx: 2 }}
      />

      {filteredProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 4 },
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          {filteredProducts.map((game, index) => (
            <ProductCard key={index} products={game} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 4, color: "gray" }}
        >
          No products found
        </Typography>
      )}
    </Box>
  );
};

export default ProductList;
