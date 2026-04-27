import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTitles, getTitleById } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

const categories = [
  { label: "Popular Movies", query: "marvel" },
  { label: "Top TV Shows", query: "series" },
  { label: "Action & Adventure", query: "action" },
  { label: "Classic Films", query: "godfather" },
];

// Hand-picked famous movies with great posters
const HERO_IDS = [
  "tt1375666", // Inception
  "tt0468569", // The Dark Knight
  "tt0816692", // Interstellar
  "tt6751668", // Parasite
  "tt0110912", // Pulp Fiction
  "tt0137523", // Fight Club
];

function HeroSlideshow() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all(HERO_IDS.map((id) => getTitleById(id))).then((results) => {
      setSlides(results.filter((r) => r.Poster && r.Poster !== "N/A"));
    });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) {
    return <div className="h-[85vh] bg-[#0A0A0A]" />;
  }

  const movie = slides[current];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background poster */}
      {slides.map((slide, i) => (
        <div
          key={slide.imdbID}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.Poster}
            alt={slide.Title}
            className="w-full h-full object-cover scale-105"
            style={{ filter: "blur(2px)" }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 px-12 pb-20 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-amber-400 mb-3 block">
          {movie.Type === "series" ? "TV Series" : "Movie"} · {movie.Year}
        </span>
        <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
          {movie.Title}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-amber-400">★</span>
          <span className="text-white font-semibold">{movie.imdbRating}</span>
          <span className="text-gray-400 text-sm">IMDb</span>
          <span className="text-gray-600">·</span>
          {movie.Genre?.split(", ").slice(0, 3).map((g) => (
            <span key={g} className="text-xs border border-white/20 text-gray-300 px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
          {movie.Plot}
        </p>
        <button
          onClick={() => navigate(`/title/${movie.imdbID}`)}
          className="bg-amber-400 text-black font-bold px-8 py-3 rounded-full hover:bg-amber-300 transition"
        >
          View Details
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 right-12 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-amber-400 w-6" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Row({ label, query }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchTitles(query)
      .then((d) => d.Search && setItems(d.Search))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-white mb-4">{label}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((movie) => (
              <div key={movie.imdbID} className="min-w-[160px]">
                <MovieCard movie={movie} />
              </div>
            ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <HeroSlideshow />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.map((cat) => (
          <Row key={cat.query} label={cat.label} query={cat.query} />
        ))}
      </div>
    </main>
  );
}

export default Home;