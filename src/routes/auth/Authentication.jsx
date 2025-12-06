import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";


export default function Authentication({ setIsLoggedIn, setUserUsername }) {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = _switch
            ? "http://localhost:8000/api/auth/login"
            : "http://localhost:8000/api/auth/register";

        try {
            const response = await axios.post(url, {
                username,
                password,
            });

            const token = response.data.accessToken;

            if (token) {
                localStorage.setItem("accessToken", token);
                setUserUsername(username);
                setIsLoggedIn(true);
            }
        } catch (err) {
            console.error("Auth failed:", err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">

                <div className="auth-tabs">
                    <button onClick={() => setSwitch(true)} className={_switch ? "active" : ""}>
                        Sign In
                    </button>

                    <button onClick={() => setSwitch(false)} className={!_switch ? "active" : ""}>
                        Sign Up
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {_switch ? (
                        <Login
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    ) : (
                        <Register
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    )}

                    <button className="auth-button" type="submit">
                        <FontAwesomeIcon icon={faKey} className="fa-icon" />
                        {_switch ? "Sign In" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
