import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { users } from "../../components/Users/Users";
import { UserContext } from "../../contexts/UserContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const user = users.find(
      (user) => user.name === username && user.password === password
    );

    if (user) {
      if (user.verify) {
        setUser(user);
        navigate("/src/pages/userprofile/");
      } else {
        setError("Twoje konto nie zostało jeszcze zweryfikowane.");
      }
    } else {
      setError("Niepoprawna nazwa użytkownika lub hasło.");
    }
  };

  const goToRegister = () => {
    navigate("/src/pages/register/");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Imię i Nazwisko"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>
        <Box mb={2} position="relative">
          <TextField
            label="Hasło"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Box>
              ),
            }}
          />
        </Box>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
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
