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
          maxWidth: 500,
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 800, color: "primary.main", mb: 3 }}
        >
          Rejestracja
        </Typography>

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Imię i nazwisko"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Hasło"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Powtórz hasło"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Box>
          <TextField
            label="Klub lub Agencja"
            fullWidth
            value={club}
            onChange={(e) => setClub(e.target.value)}
          />
          <TextField
            label="Adres e-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Numer telefonu"
            type="tel"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value === "" ? "" : Number(e.target.value))}
            inputProps={{ pattern: "[0-9]*", maxLength: 15 }}
          />
          <FormControl fullWidth required>
            <InputLabel>Rola w klubie</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Rola w klubie"
            >
              <MenuItem value="Dyrektor Sportowy">Dyrektor Sportowy</MenuItem>
              <MenuItem value="Menadżer">Menadżer</MenuItem>
              <MenuItem value="Własciciel">Własciciel</MenuItem>
              <MenuItem value="Prezydent">Prezydent</MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
              }
              label={<Typography variant="body2">Zgadzam się na przetwarzanie danych</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToPrivacy}
                  onChange={(e) => setAgreeToPrivacy(e.target.checked)}
                  required
                />
              }
              label={<Typography variant="body2">Akceptuję politykę prywatności</Typography>}
            />
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 1, borderRadius: 2, fontWeight: "bold", py: 1.5 }}
          >
            Zarejestruj
          </Button>

          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Masz już konto? Zaloguj się
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;