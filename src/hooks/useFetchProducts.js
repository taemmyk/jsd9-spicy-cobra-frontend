import { useState, useEffect } from "react";
import api from "../services/api";

function useFetchProducts(searchQuery) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]); // filtered
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // โหลด products ทั้งหมดครั้งเดียว
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/products");
        setAllProducts(response.data);
        setProducts(response.data); // default filtered list = all
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // ถ้ามี search query ค่อยยิง API ค้นหา
  useEffect(() => {
    if (!searchQuery) {
      setProducts(allProducts); // reset filtered
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/products/search?q=${encodeURIComponent(searchQuery)}`
        );
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, allProducts]);

  return { products, allProducts, loading, error };
}

export default useFetchProducts;
