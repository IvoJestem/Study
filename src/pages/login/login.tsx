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
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../../contexts/UseUser";

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
        backgroundColor: "#0A1929", 
        backgroundImage:
          "radial-gradient(circle at 80% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255, 0, 122, 0.1) 0%, transparent 40%)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.98)", 
            borderTop: "5px solid #FF007A", 
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: "#00B4D8", fontWeight: 900, letterSpacing: 2 }}
            >
              System Transferowy
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 900,
                color: "#0A1929",
                mt: 1,
              }}
            >
              Witaj Ponownie
            </Typography>
          </Box>

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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#00B4D8" },
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#00B4D8" },
                },
              }}
            />
            
            {errorMsg && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                mt: 1,
                borderRadius: 50,
                fontWeight: 800,
                fontSize: "1.1rem",
                textTransform: "none",
                backgroundColor: "#FF007A",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#D80065",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(255,0,122,0.3)",
                },
              }}
            >
              Zaloguj do Panelu
            </Button>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Nowy w świecie transferów?{" "}
              <Button
                onClick={goToRegister}
                sx={{
                  fontWeight: 800,
                  textTransform: "none",
                  color: "#00B4D8",
                  p: 0,
                  minWidth: "auto",
                  ml: 0.5,
                  "&:hover": { backgroundColor: "transparent", textDecoration: "underline" }
                }}
              >
                Załóż konto
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;