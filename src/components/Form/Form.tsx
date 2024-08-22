import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
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
  "Lewy Obrońca",
  "Środkowy Obrońca",
  "Prawy Obrońca",
  "Defensywny Pomocnik",
  "Lewy Pomocnik",
  "Środkowy Pomocnik",
  "Ofensywny Pomocnik",
  "Prawy Pomocnik",
  "Lewy Napastnik",
  "Prawy Napastnik",
  "Cofnięty Napastnik",
  "Środkowy Napastnik",
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
        gap: 2,
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
        sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
      />
      <InputLabel id="position-select-label">Pozycja</InputLabel>
      <Select
        labelId="position-select-label"
        multiple
        value={positionsSelected}
        onChange={(e) => setPositionsSelected(e.target.value as string[])}
        displayEmpty
        inputProps={{ "aria-label": "Pozycja" }}
        fullWidth
        variant="outlined"
        disabled={isLocked}
        sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
      >
        {positions.map((pos) => (
          <MenuItem key={pos} value={pos}>
            {pos}
          </MenuItem>
        ))}
      </Select>
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
          sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
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
          sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
        />
      </Box>
      <TextField
        label="Narodowość"
        value={nation}
        onChange={(e) => setNation(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
        sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
      />
      <TextField
        label="Klub"
        value={club}
        onChange={(e) => setClub(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={isLocked}
        sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
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
          sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
        />
        <Select
          value={budgetUnit}
          onChange={(e) => setBudgetUnit(e.target.value as string)}
          displayEmpty
          inputProps={{ "aria-label": "Jednostka" }}
          fullWidth
          variant="outlined"
          disabled={isLocked}
          sx={{ backgroundColor: isLocked ? "#e0e0e0" : "transparent" }}
        >
          <MenuItem value="tyś">tyś</MenuItem>
          <MenuItem value="mln">mln</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="success">
          Zatwierdź
        </Button>
        <Button
          type="button"
          onClick={handleEdit}
          variant="contained"
          color="warning"
        >
          Edytuj
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outlined"
          color="error"
        >
          Resetuj
        </Button>
      </Box>
    </Box>
  );
};
