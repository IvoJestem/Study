import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { users } from "../../components/Users/Users";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [club, setClub] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    // Sprawdzenie, czy użytkownik już istnieje
    const userExists = users.some((user) => user.login === username);

    if (userExists) {
      setError("Nazwa użytkownika jest już zajęta");
    } else {
      // Dodanie nowego użytkownika do bazy (symulacja)
      users.push({
        name: name,
        login: username,
        password: password,
        club: club,
      });

      navigate("../../../../");
    }
  };

  return (
    <div className="register-container">
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Imię i nazwisko:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="club">Klub:</label>
          <input
            type="text"
            id="club"
            value={club}
            onChange={(e) => setClub(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default Register;
