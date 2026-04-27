import { useState } from "react";
import { searchTitles } from "../api/omdb";

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchTitles(query);
      if (data.Response === "True") {
        setResults(data.Search);
      } else {
        setError(data.Error);
        setResults([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};