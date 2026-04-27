# 🎬 Flickr — Find Your Next Favourite

A cinematic movie and TV show discovery app built with React, powered by the OMDb API.

🔗 **Live Demo:** [flickr-blush.vercel.app](https://flickr-blush.vercel.app)

---

## Features

- 🔍 Search millions of movies and TV shows by title
- 🎞️ Auto-sliding hero with famous movie backdrops
- 📄 Full detail pages with ratings, cast, plot and genres
- 🔖 Save titles to a personal Watchlist (persisted with localStorage)
- ⏳ Loading skeleton cards for smooth async UX
- 📱 Fully responsive with a mobile hamburger menu
- ♾️ Paginated search results with "Load More"

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| HTTP | Axios |
| API | OMDb API |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/XxsrthxX/flickr.git
cd flickr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your OMDb API key
Create a `.env` file in the root:
VITE_OMDB_API_KEY=your_key_here

Get a free key at [omdbapi.com](https://omdbapi.com)

### 4. Run the dev server
```bash
npm run dev
```

---

## Project Structure

src/
├── api/           # OMDb API calls
├── components/    # Navbar, MovieCard, SkeletonCard
├── hooks/         # useWatchlist, useSearch
└── pages/         # Home, Search, Detail, Watchlist


---

## What I Learned

- Fetching and handling async data from a REST API in React
- Managing loading, error, and empty states for a polished UX
- Building reusable components and custom hooks
- Persisting state with localStorage
- Deploying a React app to Vercel with environment variables

---

## Author

**XxsrthxX** — [GitHub](https://github.com/XxsrthxX)

---

_Built as part of my junior web developer portfolio_