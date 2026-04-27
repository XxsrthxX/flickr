import { useState } from "react";

const KEY = "flickr_watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  const add = (movie) => {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const remove = (imdbID) => {
    const updated = watchlist.filter((m) => m.imdbID !== imdbID);
    setWatchlist(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const isInList = (imdbID) => watchlist.some((m) => m.imdbID === imdbID);

  return { watchlist, add, remove, isInList };
};