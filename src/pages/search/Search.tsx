import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { initialPlayer, Player } from "../../components/Database/Database";
import { SearchForm } from "../../components/Form/Form";
import CombinationResults from "../../components/CombinationResults/CombinationResults";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const Search: React.FC = () => {
  const [players] = useState<Player[]>(initialPlayer);
  const [positions, setPositions] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSearchPlayer = (criteria: {
    name: string;
    position: string[];
    ageMin: number | null;
    ageMax: number | null;
    nation: string;
    club: string;
    budget: number | null;
  }) => {
    setPositions(criteria.position);
    setBudget(criteria.budget ?? 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f5f5", // Dodanie tła dla lepszej czytelności
      }}
    >
      {/* Slide-out Menu */}
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 3,
          marginLeft: isMenuOpen ? "250px" : 0,
          transition: "margin-left 0.3s ease", // Płynne przejście marginesu
          height: "100%",
          backgroundColor: "#fff", // Tło dla głównej treści
          boxShadow: 2, // Dodanie cienia dla głębi
          borderRadius: 2, // Zaokrąglone rogi
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsMenuOpen(true)}
            sx={{
              borderRadius: 4, // Zaokrąglone rogi przycisku
              boxShadow: 3, // Dodanie lekkiego cienia
            }}
          >
            Open Menu
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Wyszukiwarka Zawodników
          </Typography>
        </Box>

        {/* Search Form Section */}
        <SearchForm onSearchPlayer={handleSearchPlayer} />

        {/* Results Section */}
        <Box sx={{ marginTop: 4 }}>
          <CombinationResults
            players={players}
            positions={positions}
            budget={budget}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
