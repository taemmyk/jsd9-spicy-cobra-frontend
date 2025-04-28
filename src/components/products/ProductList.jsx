import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/products")
        setProductsData(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
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
  }, [searchText, productsData]); 

  
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

      {loading ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "red" }}>
          {error}
        </Typography>
      ) : filteredProducts.length > 0 ? (
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
            <ProductCard key={game._id || index} products={game} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "gray" }}>
          No products found
        </Typography>
      )}
    </Box>
  );
};

export default ProductList;
