import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from "./routes/auth/Authentication";

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            setIsLoggedIn(false);
            return;
        }

        axios.post(
            "http://localhost:8000/api/auth/",
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        .then((response) => {
            setIsLoggedIn(true);
            setUserUsername(response.data.username);
        })
        .catch(() => {
            setIsLoggedIn(false);
        });

    }, []);

    return (
        <div className="App">
            {isLoggedIn ? (
                <Dashboard username={userUsername} />
            ) : (
                <Authentication />
            )}
        </div>
    );
}
