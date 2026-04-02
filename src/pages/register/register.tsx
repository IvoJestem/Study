import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
  Container,
} from "@mui/material";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | "">("");
  const [role, setRole] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Hasła nie pasują do siebie");
      return;
    }

    if (isNaN(phone as number)) {
      setError("Numer telefonu jest nieprawidłowy");
      return;
    }

    if (!agreeToTerms || !agreeToPrivacy) {
      setError("Musisz zaakceptować wymagane zgody.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        password,
        club,
        email,
        phone: Number(phone),
        role,
        verify: false,
      });

      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Użytkownik z takimi danymi już istnieje lub wystąpił błąd serwera.");
    }
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: "#00B4D8" },
    },
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
          "radial-gradient(circle at 20% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255, 0, 122, 0.1) 0%, transparent 40%)",
        p: 2,
        py: 6,
      }}
    >
      <Container maxWidth="sm">
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
              Dołącz do gry
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 900, color: "#0A1929", mt: 1 }}
            >
              Rejestracja
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              label="Imię i nazwisko"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={inputStyle}
            />

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <TextField
                label="Hasło"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={inputStyle}
              />
              <TextField
                label="Powtórz hasło"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={inputStyle}
              />
            </Box>

            <TextField
              label="Klub lub Agencja"
              fullWidth
              value={club}
              onChange={(e) => setClub(e.target.value)}
              sx={inputStyle}
            />

            <TextField
              label="Adres e-mail"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={inputStyle}
            />

            <TextField
              label="Numer telefonu"
              type="tel"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value === "" ? "" : Number(e.target.value))}
              inputProps={{ pattern: "[0-9]*", maxLength: 15 }}
              sx={inputStyle}
            />

            <FormControl fullWidth required sx={inputStyle}>
              <InputLabel>Rola w klubie</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Rola w klubie"
              >
                <MenuItem value="Dyrektor Sportowy">Dyrektor Sportowy</MenuItem>
                <MenuItem value="Menadżer">Menadżer</MenuItem>
                <MenuItem value="Własciciel">Właściciel</MenuItem>
                <MenuItem value="Prezydent">Prezydent</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required sx={{ color: "#00B4D8", "&.Mui-checked": { color: "#00B4D8" } }} />}
                label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Zgadzam się na przetwarzanie danych</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={agreeToPrivacy} onChange={(e) => setAgreeToPrivacy(e.target.checked)} required sx={{ color: "#00B4D8", "&.Mui-checked": { color: "#00B4D8" } }} />}
                label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Akceptuję politykę prywatności</Typography>}
              />
            </Box>

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                mt: 2,
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
              Zarejestruj Konto
            </Button>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Masz już konto?{" "}
              <Button
                onClick={() => navigate("/login")}
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
                Zaloguj się
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;