import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Player, initialPlayer } from "../../components/Database/Database";
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
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          backgroundColor: "#fff",
          padding: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        {!isMenuOpen && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsMenuOpen(true)}
            sx={{
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            Open Menu
          </Button>
        )}
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Wyszukiwarka Zawodników
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <SearchForm onSearchPlayer={handleSearchPlayer} />

        <Box sx={{ marginTop: 4 }}>
          <CombinationResults
            players={players}
            positions={positions}
            budget={budget}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Search;
