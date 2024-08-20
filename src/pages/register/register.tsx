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
import { users } from "../../components/Users/Users";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | "">("");
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [confirmationDoc, setConfirmationDoc] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (isNaN(phone as number)) {
      setError("Numer telefonu jest nieprawidłowy");
      return;
    }

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("Adres e-mail jest już zajęty");
    } else if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają");
    } else if (!agreeToTerms) {
      setError("Musisz zgodzić się na warunki korzystania z systemu");
    } else {
      if (identityDoc && confirmationDoc) {
        console.log("Identity Document:", identityDoc);
        console.log("Confirmation Document:", confirmationDoc);
      }

      users.push({
        name: name,
        email: email,
        password: password,
        club: club,
        phone: Number(phone),
        role: role,
        verify: false,
      });

      navigate("../../../../");
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
          <Typography variant="h6">Dokumenty</Typography>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) =>
              setIdentityDoc(e.target.files ? e.target.files[0] : null)
            }
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Dokument tożsamości
          </Typography>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) =>
              setConfirmationDoc(e.target.files ? e.target.files[0] : null)
            }
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Dokument potwierdzający rejestrację
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
          />
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            Akceptuję warunki korzystania z systemu
          </Typography>
        </Box>
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
