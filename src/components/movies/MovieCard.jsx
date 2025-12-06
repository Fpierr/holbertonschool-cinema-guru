import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./movies.css";

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const favRes = await axios.get("http://localhost:8000/api/titles/favorite/");
        const watchRes = await axios.get("http://localhost:8000/api/titles/watchlater/");

        setIsFavorite(favRes.data.some((m) => m.imdbId === movie.imdbId));
        setIsWatchLater(watchRes.data.some((m) => m.imdbId === movie.imdbId));
      } catch (e) {
        console.log("Error loading lists", e);
      }
    };

    fetchStatus();
  }, [movie.imdbId]);

  const handleClick = async (type) => {
    try {
      const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;

      if (type === "favorite") {
        if (isFavorite) {
          await axios.delete(url);
          setIsFavorite(false);
        } else {
          await axios.post(url);
          setIsFavorite(true);
        }
      }

      if (type === "watchlater") {
        if (isWatchLater) {
          await axios.delete(url);
          setIsWatchLater(false);
        } else {
          await axios.post(url);
          setIsWatchLater(true);
        }
      }
    } catch (err) {
      console.log("Action failed:", err);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-image">
        <img src={movie.image} alt={movie.title} />
        <div className="movie-title-overlay">
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      </div>

      <div className="movie-details">
        <p className="movie-synopsis">{movie.synopsis}</p>

        <div className="movie-genres">
          {movie.genres.map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>

        {/* Icons */}
        <div className="movie-actions">
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => handleClick("favorite")}
            style={{ cursor: "pointer", color: isFavorite ? "red" : "white" }}
          />

          <FontAwesomeIcon
            icon={faClock}
            onClick={() => handleClick("watchlater")}
            style={{ cursor: "pointer", color: isWatchLater ? "yellow" : "white" }}
          />
        </div>
      </div>
    </li>
  );
}
