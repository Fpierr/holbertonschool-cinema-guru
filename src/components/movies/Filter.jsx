import "./movies.css";
import Tag from "./Tag";
import SelectInput from "../general/SelectInput";
import SearchBar from "../general/SearchBar";
const GENRES = [
  "action", "drama", "comedy", "biography", "romance", "thriller",
  "war", "history", "sport", "sci-fi", "documentary",
  "crime", "fantasy"
];

export default function Filter({
  minYear, setMinYear,
  maxYear, setMaxYear,
  sort, setSort,
  genres, setGenres,
  title, setTitle
}) {
  return (
    <div className="filter-container">

      {/* Search bar */}
      <SearchBar title={title} setTitle={setTitle} />

      {/* Min / Max year */}
      <div>
        <input
          type="number"
          placeholder="Min year"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max year"
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
        />
      </div>

      {/* Sorting */}
      <SelectInput sort={sort} setSort={setSort} />

      {/* Genre tags */}
      <ul className="tags-list">
        {GENRES.map((g) => (
          <Tag
            key={g}
            genre={g}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
}
