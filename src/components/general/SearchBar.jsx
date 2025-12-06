import { useState } from "react";
import "./general.css";

export default function SearchBar({ title, setTitle }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className={`search-bar ${isFocused ? "focused" : ""}`} >
            <input
                type="text"
                className="search-input"
                value={title}
                onChange={handleInput}
                placeholder="Search Movies"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};
