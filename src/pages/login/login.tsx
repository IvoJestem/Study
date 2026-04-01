import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../../components/UseUser/UseUser";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        name: username,
        password,
      });

      if (response.data.success) {
        setUser(response.data.user);
        navigate("/home");
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (err) {
      setErrorMsg("Wystąpił błąd podczas logowania.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 450,
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: "primary.main",
            mb: 4,
          }}
        >
          Logowanie
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Imię i Nazwisko"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
            }}
          >
            Zaloguj
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Nie masz konta?{" "}
            <Button
              onClick={goToRegister}
              color="secondary"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                p: 0,
                minWidth: "auto",
                ml: 0.5,
              }}
            >
              Zarejestruj się
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;