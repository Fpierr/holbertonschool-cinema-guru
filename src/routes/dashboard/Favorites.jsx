import { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/titles/favorite/");
        setMovies(res.data);
      } catch (err) {
        console.log("Failed to load favorites", err);
      }
    };

    loadFavorites();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Movies you like</h1>

      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
