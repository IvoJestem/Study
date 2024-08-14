import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { users } from "../../components/Users/Users";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const user = users.find(
      (user) => user.login === username && user.password === password
    );

    if (user) {
      navigate("/src/pages/home/");
    } else {
      setError("Niepoprawna nazwa użytkownika lub hasło");
    }
  };

  const goToRegister = () => {
    navigate("/src/pages/register/");
  };

  return (
    <Box
      className="login-container"
      sx={{ maxWidth: 400, margin: "auto", padding: 3 }}
    >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Nazwa użytkownika"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Hasło"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Zaloguj
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Button onClick={goToRegister} color="secondary">
          Zarejestruj
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
