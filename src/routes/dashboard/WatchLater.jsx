import { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

export default function WatchLater() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadWatchLater = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/titles/watchlater/");
        setMovies(res.data);
      } catch (err) {
        console.log("Failed to load watch later movies", err);
      }
    };

    loadWatchLater();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Movies you want to watch later</h1>

      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
