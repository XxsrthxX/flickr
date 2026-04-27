import axios from "axios";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const searchTitles = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, s: query, page },
  });
  return response.data;
};

export const getTitleById = async (imdbId) => {
  const response = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, i: imdbId, plot: "full" },
  });
  return response.data;
};