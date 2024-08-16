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
      }}
    >
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 2,
          marginLeft: isMenuOpen ? "250px" : 0, // Dodaj margines w lewo, gdy menu jest otwarte
          transition: "margin-left 0.3s ease", // Płynne przejście marginesu
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsMenuOpen(true)}
          >
            Open Menu
          </Button>
          <Typography variant="h4" gutterBottom>
            Wyszukiwarka Zawodników
          </Typography>
        </Box>
        <SearchForm onSearchPlayer={handleSearchPlayer} />
        <CombinationResults
          players={players}
          positions={positions}
          budget={budget}
        />
      </Box>
    </Box>
  );
};

export default Search;
