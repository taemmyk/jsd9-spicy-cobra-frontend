import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchInput from "../common/SearchInput";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchText !== searchQuery) {
      setSearchText(searchQuery);
    }
  }, [searchQuery, searchText]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ filter โดยใช้ข้อมูลจาก backend ที่โหลดมา
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return allProducts;

    const lowerSearch = searchText.toLowerCase().trim();

    return allProducts.filter((product) =>
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
  }, [searchText, allProducts]);

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
          {filteredProducts.map((game) => (
            <ProductCard key={game._id || game.product_id} product={game} />
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
