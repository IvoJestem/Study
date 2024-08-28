import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        name: username,
        password,
      });

      if (response.data.success) {
        const user = response.data.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Wystąpił błąd podczas logowania.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.default",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
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
        <Box mb={2}>
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
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
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
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          Zaloguj
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Button
          onClick={goToRegister}
          color="secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Zarejestruj
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
