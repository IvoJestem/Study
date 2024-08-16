import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { users } from "../../components/Users/Users";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [club, setClub] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    const userExists = users.some((user) => user.login === username);

    if (userExists) {
      setError("Nazwa użytkownika jest już zajęta");
    } else if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają");
    } else {
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
    <Box
      sx={{
        width: 300,
        margin: "0 auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Rejestracja
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Imię i nazwisko"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Nazwa użytkownika"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Hasło"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Powtórz hasło"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <TextField
          label="Klub"
          variant="outlined"
          fullWidth
          margin="normal"
          value={club}
          onChange={(e) => setClub(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Zarejestruj
        </Button>
      </form>
    </Box>
  );
};

export default Register;
