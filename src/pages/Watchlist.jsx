import { useWatchlist } from "../hooks/useWatchlist";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <main className="pt-24 pb-16 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-white mb-2">My Watchlist</h2>
      <p className="text-gray-500 text-sm mb-8">{watchlist.length} saved titles</p>

      {watchlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🎬</p>
          <p className="text-white font-semibold text-lg">Your watchlist is empty</p>
          <p className="text-gray-500 text-sm mt-2">
            Click the bookmark icon on any title to save it here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Watchlist;