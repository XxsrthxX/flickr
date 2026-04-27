import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTitleById } from "../api/omdb";
import { useWatchlist } from "../hooks/useWatchlist";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { add, remove, isInList } = useWatchlist();
  const saved = title ? isInList(title.imdbID) : false;

  useEffect(() => {
    getTitleById(id)
      .then((data) => setTitle(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!title || title.Response === "False") {
    return (
      <div className="pt-24 text-center text-white">
        <p>Title not found.</p>
      </div>
    );
  }

  const poster =
    title.Poster !== "N/A"
      ? title.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white text-sm mb-8 flex items-center gap-2 transition"
      >
        ← Back
      </button> 
            <button
        onClick={() => saved ? remove(title.imdbID) : add({ imdbID: title.imdbID, Title: title.Title, Poster: title.Poster, Year: title.Year, Type: title.Type })}
        className={`px-6 py-3 rounded-full font-semibold text-sm transition ${
            saved
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-amber-400 text-black hover:bg-amber-300"
        }`}
        >
        {saved ? "✓ Saved" : "+ Watchlist"}
        </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <img
          src={poster}
          alt={title.Title}
          className="w-64 rounded-2xl object-cover self-start border border-white/10"
        />

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full uppercase tracking-wide">
              {title.Type}
            </span>
            <span className="text-gray-500 text-sm">{title.Year}</span>
            <span className="text-gray-500 text-sm">{title.Runtime}</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">{title.Title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400 text-lg">★</span>
            <span className="text-white font-semibold">{title.imdbRating}</span>
            <span className="text-gray-500 text-sm">/ 10 IMDb</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {title.Genre?.split(", ").map((g) => (
              <span
                key={g}
                className="text-xs border border-amber-400/30 text-amber-400 px-3 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{title.Plot}</p>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Director</p>
              <p className="text-white">{title.Director}</p>
            </div>
            <div>
              <p className="text-gray-500">Cast</p>
              <p className="text-white">{title.Actors}</p>
            </div>
            <div>
              <p className="text-gray-500">Language</p>
              <p className="text-white">{title.Language}</p>
            </div>
            <div>
              <p className="text-gray-500">Country</p>
              <p className="text-white">{title.Country}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Detail;