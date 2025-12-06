import React from "react";
import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header({ userUsername, setIsLoggedIn }) {

    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    return (
        <nav className="header">
            <div className="header-left">
                <p className="header-title">Cinema Guru</p>
            </div>

            <div className="header-right">
                <div className="user-info">
                    <img src="https://picsum.photos/100/100" alt="avatar" />
                    <p>Welcome, {userUsername}</p>
                </div>

                <span className="logout-btn" onClick={logout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Logout
                </span>
            </div>
        </nav>
    );
}
