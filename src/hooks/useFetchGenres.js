import { useState, useEffect } from 'react';
import api from '../services/api';

function useFetchGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}

export default useFetchGenres;