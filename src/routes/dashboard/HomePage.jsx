import { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import axios from "axios";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = async (pageNumber = 1) => {
    try {
      const res = await axios.get("http://localhost:8000/api/titles/advancedsearch", {
        params: {
          minYear,
          maxYear,
          genres: genres.join(","),
          title,
          sort,
          page: pageNumber,
        },
      });

      if (pageNumber === 1) {
        setMovies(res.data);
      } else {
        setMovies((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.log("Failed to load movies", err);
    }
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="dashboard-container">
      {/* Filter section */}
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        genres={genres}
        setGenres={setGenres}
        sort={sort}
        setSort={setSort}
        title={title}
        setTitle={setTitle}
      />

      {/* Movie List */}
      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>

      {/* Load more */}
      <button className="load-more-button" onClick={loadMore}>
        Load More..
      </button>
    </div>
  );
}
