import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-amber-400 tracking-tight">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="8" fill="#F59E0B"/>
          <polygon points="11,8 22,14 11,20" fill="#0A0A0A"/>
          <rect x="6" y="8" width="3" height="12" rx="1.5" fill="#0A0A0A"/>
        </svg>
        Flickr
      </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
          <Link to="/search?q=avengers" className="text-sm text-gray-400 hover:text-white transition">Movies</Link>
          <Link to="/watchlist" className="text-sm text-gray-400 hover:text-white transition">Watchlist</Link>
          <Link to="/search?q=breaking+bad" className="text-sm text-gray-400 hover:text-white transition">TV Shows</Link>
          
        </div>

        {/* Desktop search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, shows..."
            className="bg-white/10 text-white text-sm placeholder-gray-500 px-4 py-2 rounded-full border border-white/10 focus:outline-none focus:border-amber-400 w-56 transition"
          />
          <button
            type="submit"
            className="bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-amber-300 transition"
          >
            Search
          </button>
        </form>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition">Home</Link>
          <Link to="/search?q=avengers" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition">Movies</Link>
          <Link to="/search?q=breaking+bad" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition">TV Shows</Link>
          <Link to="/watchlist" className="text-sm text-gray-400 hover:text-white transition">Watchlist</Link>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-white/10 text-white text-sm placeholder-gray-500 px-4 py-2 rounded-full border border-white/10 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-full"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;