import React from "react";
import "./components.css";

export default function Activity({ activity }) {
    const { type, username, movie, date } = activity;

    return (
        <li className="activity-item">
            <p className="activity-type">{type}</p>
            <p className="activity-username">{username}</p>
            <p className="activity-movie">{movie}</p>
            <p className="activity-date">{date}</p>
        </li>
    );
}
