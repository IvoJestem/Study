import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import stylów

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === "admin" && password === "123") {
      navigate("/src/pages/home/");
    } else {
      setError("Niepoprawna nazwa użytkownika lub hasło");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
