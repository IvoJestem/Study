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
      setError(
        "Musisz zaakceptować warunki korzystania z systemu i politykę prywatności."
      );
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
    } catch (error) {
      setError("Błąd podczas rejestracji użytkownika");
    }
  };

  return (
    <Box
      sx={{
        width: 400,
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
          label="Klub lub Agencja"
          variant="outlined"
          fullWidth
          margin="normal"
          value={club}
          onChange={(e) => setClub(e.target.value)}
        />
        <TextField
          label="Adres e-mail"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Numer telefonu"
          variant="outlined"
          type="tel"
          fullWidth
          margin="normal"
          value={phone === "" ? "" : phone}
          onChange={(e) =>
            setPhone(e.target.value === "" ? "" : Number(e.target.value))
          }
          inputProps={{ pattern: "[0-9]*", maxLength: 15 }}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Rola w klubie</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Rola w klubie"
            required
          >
            <MenuItem value="Dyrektor Sportowy">Dyrektor Sportowy</MenuItem>
            <MenuItem value="Menadżer">Menadżer</MenuItem>
            <MenuItem value="Własciciel">Własciciel</MenuItem>
            <MenuItem value="Prezydent">Prezydent</MenuItem>
            <MenuItem value="Agent">Agent</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
          />
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            Zgadzam się na przetwarzanie danych
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <input
            type="checkbox"
            checked={agreeToPrivacy}
            onChange={(e) => setAgreeToPrivacy(e.target.checked)}
            required
          />
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            Akceptuję politykę prywatności
          </Typography>
        </Box>
        {error && (
          <Box mt={2}>
            <Typography color="error">{error}</Typography>
          </Box>
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
