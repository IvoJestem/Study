import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
  FormControl,
} from "@mui/material";
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
  const [budgetUnit, setBudgetUnit] = useState<string>("tyś");
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
    setBudgetUnit("tyś");
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <TextField
        label="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
      />

      <FormControl fullWidth disabled={isLocked}>
        <InputLabel id="position-select-label">Pozycja</InputLabel>
        <Select
          labelId="position-select-label"
          multiple
          value={positionsSelected}
          onChange={(e) => setPositionsSelected(e.target.value as string[])}
          label="Pozycja"
        >
          {positions.map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Wiek min"
          type="number"
          value={ageMin ?? ""}
          onChange={(e) =>
            setAgeMin(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
        />
        <TextField
          label="Wiek max"
          type="number"
          value={ageMax ?? ""}
          onChange={(e) =>
            setAgeMax(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
        />
      </Box>

      <TextField
        label="Narodowość"
        value={nation}
        onChange={(e) => setNation(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
      />

      <TextField
        label="Klub"
        value={club}
        onChange={(e) => setClub(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Budżet"
          type="number"
          value={budgetAmount ?? ""}
          onChange={(e) =>
            setBudgetAmount(e.target.value ? Number(e.target.value) : null)
          }
          variant="outlined"
          fullWidth
          disabled={isLocked}
        />
        <FormControl fullWidth disabled={isLocked}>
          <InputLabel id="budget-unit-label">Jednostka</InputLabel>
          <Select
            labelId="budget-unit-label"
            value={budgetUnit}
            onChange={(e) => setBudgetUnit(e.target.value as string)}
            label="Jednostka"
          >
            <MenuItem value="tyś">tyś</MenuItem>
            <MenuItem value="mln">mln</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 1, justifyContent: "space-between" }}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={isLocked}
          sx={{ flexGrow: 1 }}
        >
          Zatwierdź
        </Button>
        <Button
          type="button"
          onClick={handleEdit}
          variant="contained"
          color="warning"
          disabled={!isLocked}
          sx={{ flexGrow: 1 }}
        >
          Edytuj
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outlined"
          color="error"
          sx={{ flexGrow: 1 }}
        >
          Resetuj
        </Button>
      </Box>
    </Box>
  );
};