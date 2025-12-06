import React from "react";
import "./auth.css";

export default function Register({
    username,
    password,
    setUsername,
    setPassword,
    setIsLoggedIn,
    setUserUsername
}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length > 0 && password.length > 0) {
            localStorage.setItem("accessToken", "fake_token");
            localStorage.setItem("username", username);

            setUserUsername(username);
            setIsLoggedIn(true);
        }
    };

    return (
        <>
            <h2 className="auth-title">Register</h2>

            <label className="input-label">Username</label>
            <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose username"
            />

            <label className="input-label">Password</label>
            <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose password"
            />
        </>
    );
}
