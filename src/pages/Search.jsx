import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchTitles } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setPage(1);
    searchTitles(query, 1)
      .then((data) => {
        if (data.Response === "True") {
          setResults(data.Search);
          setTotalResults(parseInt(data.totalResults));
        } else {
          setError(data.Error);
          setResults([]);
        }
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, [query]);

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    searchTitles(query, nextPage)
      .then((data) => {
        if (data.Response === "True") {
          setResults((prev) => [...prev, ...data.Search]);
          setPage(nextPage);
        }
      })
      .finally(() => setLoadingMore(false));
  };

  const hasMore = results.length < totalResults;

  return (
    <main className="pt-24 pb-16 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-white mb-2">
        Results for <span className="text-amber-400">"{query}"</span>
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        {totalResults > 0 ? `${totalResults} titles found` : ""}
      </p>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🎬</p>
          <p className="text-white font-semibold text-lg">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Search;