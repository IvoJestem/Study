import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
  FormControl,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { convertPriceToNumber } from "../../utils/price/price";

interface FormProps {
  onSearchPlayer: (criteria: {
    name: string;
    position: string[];
    ageMin: number | null;
    ageMax: number | null;
    nation: string;
    club: string;
    budget: number | null;
  }) => void;
}

const positions = [
  "Bramkarz",
  "Lewy obrońca",
  "Środkowy obrońca",
  "Prawy obrońca",
  "Defensywny pomocnik",
  "Lewy pomocnik",
  "Środkowy pomocnik",
  "Ofensywny pomocnik",
  "Prawy pomocnik",
  "Lewy napastnik",
  "Prawy napastnik",
  "Cofnięty napastnik",
  "Środkowy napastnik",
];

export const SearchForm: React.FC<FormProps> = ({ onSearchPlayer }) => {
  const [name, setName] = useState<string>("");
  const [positionsSelected, setPositionsSelected] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [nation, setNation] = useState<string>("");
  const [club, setClub] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<number | null>(null);
  const [budgetUnit, setBudgetUnit] = useState<string>("tys"); 
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSearchPlayer({
      name,
      position: positionsSelected,
      ageMin,
      ageMax,
      nation,
      club,
      budget:
        budgetAmount !== null
          ? convertPriceToNumber(budgetAmount, budgetUnit)
          : null,
    });

    setIsLocked(true);
  };

  const handleReset = () => {
    setName("");
    setPositionsSelected([]);
    setAgeMin(null);
    setAgeMax(null);
    setNation("");
    setClub("");
    setBudgetAmount(null);
    setBudgetUnit("tys");
    setIsLocked(false);

    onSearchPlayer({
      name: "",
      position: [],
      ageMin: null,
      ageMax: null,
      nation: "",
      club: "",
      budget: null,
    });
  };

  const handleEdit = () => {
    setIsLocked(false);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: isLocked ? "rgba(0,0,0,0.02)" : "#fff",
      "&.Mui-focused fieldset": { borderColor: "#00B4D8", borderWidth: "2px" },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <TextField
        label="Nazwisko Zawodnika (opcjonalnie)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
        sx={inputStyle}
      />

      <FormControl fullWidth disabled={isLocked} sx={inputStyle}>
        <InputLabel id="position-select-label">Pozycja na boisku</InputLabel>
        <Select
          labelId="position-select-label"
          multiple
          value={positionsSelected}
          onChange={(e) => setPositionsSelected(e.target.value as string[])}
          label="Pozycja na boisku"
        >
          {positions.map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          label="Wiek (Od)"
          type="number"
          value={ageMin ?? ""}
          onChange={(e) =>
            setAgeMin(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
          sx={inputStyle}
        />
        <TextField
          label="Wiek (Do)"
          type="number"
          value={ageMax ?? ""}
          onChange={(e) =>
            setAgeMax(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
          sx={inputStyle}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          label="Narodowość"
          value={nation}
          onChange={(e) => setNation(e.target.value)}
          variant="outlined"
          fullWidth
          disabled={isLocked}
          sx={inputStyle}
        />
        <TextField
          label="Obecny Klub"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          variant="outlined"
          fullWidth
          disabled={isLocked}
          sx={inputStyle}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          label="Maksymalny Budżet"
          type="number"
          value={budgetAmount ?? ""}
          onChange={(e) =>
            setBudgetAmount(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceWalletIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={inputStyle}
        />
        <FormControl disabled={isLocked} sx={{ ...inputStyle, minWidth: { sm: 120 } }}>
          <InputLabel id="budget-unit-label">Jednostka</InputLabel>
          <Select
            labelId="budget-unit-label"
            value={budgetUnit}
            onChange={(e) => setBudgetUnit(e.target.value as string)}
            label="Jednostka"
          >
            <MenuItem value="tys">tys.</MenuItem>
            <MenuItem value="mln">mln.</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 1, borderStyle: "dashed" }} />

      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          disabled={isLocked}
          sx={{ 
            flexGrow: 1, 
            borderRadius: "50px", 
            py: 1.5, 
            fontWeight: 800,
            bgcolor: "#00B4D8",
            "&:hover": { bgcolor: "#008ba8" }
          }}
        >
          Zatwierdź Kryteria
        </Button>
        <Button
          type="button"
          onClick={handleEdit}
          variant="contained"
          startIcon={<EditIcon />}
          disabled={!isLocked}
          sx={{ 
            flexGrow: 1, 
            borderRadius: "50px", 
            py: 1.5, 
            fontWeight: 800,
            bgcolor: "#f59e0b",
            color: "#fff",
            "&:hover": { bgcolor: "#d97706" }
          }}
        >
          Edytuj
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outlined"
          startIcon={<RestartAltIcon />}
          color="error"
          sx={{ 
            flexGrow: 1, 
            borderRadius: "50px", 
            py: 1.5, 
            fontWeight: 800,
            borderWidth: "2px",
            "&:hover": { borderWidth: "2px" }
          }}
        >
          Resetuj
        </Button>
      </Box>
    </Box>
  );
};