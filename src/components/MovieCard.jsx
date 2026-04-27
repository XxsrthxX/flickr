import { Link } from "react-router-dom";
import { useState } from "react";

function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgError;

  return (
    <Link to={`/title/${movie.imdbID}`}>
      <div className="group relative rounded-xl overflow-hidden bg-[#141414] border border-white/5 hover:border-amber-400/50 transition duration-300 hover:scale-105 cursor-pointer">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            onError={() => setImgError(true)}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-[#1a1a1a] flex flex-col items-center justify-center gap-2 px-4">
            <span className="text-4xl">🎬</span>
            <p className="text-gray-500 text-xs text-center leading-snug">{movie.Title}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition text-amber-400 text-3xl">▶</span>
        </div>

        <div className="p-3">
          <h3 className="text-white text-sm font-semibold truncate">{movie.Title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-400 text-xs">{movie.Year}</span>
            <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">
              {movie.Type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;