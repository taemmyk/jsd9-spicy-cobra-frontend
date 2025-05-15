import { useState, useEffect } from "react";
import api from "../services/api";

function useFetchProducts(searchQuery, genre) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "/products";
        if (searchQuery) {
          url = `/products/search?q=${encodeURIComponent(searchQuery)}`;
        } else if (genre && genre !== "View All") {
          url = `/products/genre/${genre}`;
        }
        const response = await api.get(url);
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, genre]);

  return { products, loading, error };
}

export default useFetchProducts;
