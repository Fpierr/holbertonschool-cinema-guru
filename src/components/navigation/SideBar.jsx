import React, { useState, useEffect } from "react";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Activity from "../Activity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
    const [selected, setSelected] = useState("home");
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);

    const navigate = useNavigate();

    const setPage = (pageName) => {
        setSelected(pageName.toLowerCase());
        switch (pageName) {
            case "Home":
                navigate("/home");
                break;
            case "Favorites":
                navigate("/favorites");
                break;
            case "Watch Later":
                navigate("/watchlater");
                break;
            default:
                navigate("/home");
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/activity")
            .then((res) => setActivities(res.data))
            .catch((err) => console.error("Failed to load activities:", err));
    }, []);

    return (
        <nav className={`sidebar ${small ? "" : "expanded"}`}>
            <ul>
                <li
                    className={selected === "home" ? "active" : ""}
                    onClick={() => setPage("Home")}
                >
                    <FontAwesomeIcon icon={faHome} />
                    {!small && <span>Home</span>}
                </li>

                <li
                    className={selected === "favorites" ? "active" : ""}
                    onClick={() => setPage("Favorites")}
                >
                    <FontAwesomeIcon icon={faHeart} />
                    {!small && <span>Favorites</span>}
                </li>

                <li
                    className={selected === "watch later" ? "active" : ""}
                    onClick={() => setPage("Watch Later")}
                >
                    <FontAwesomeIcon icon={faClock} />
                    {!small && <span>Watch Later</span>}
                </li>
            </ul>

            {showActivities && (
                <ul className="activities">
                    {activities.slice(0, 10).map((activity, index) => (
                        <Activity key={index} activity={activity} />
                    ))}
                </ul>
            )}
        </nav>
    );
}
