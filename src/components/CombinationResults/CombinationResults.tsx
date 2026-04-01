import React, { useState } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import generateCombinations from "../../utils/Combinations/combinations";
import PlayerTable from "../PlayerTable/PlayerTable";
import { Player } from "../../types/Player";
import { useUser } from "../UseUser/UseUser";

const CombinationResults: React.FC<{
  players: Player[];
  positions: string[];
  budget: number;
}> = ({ players, positions, budget }) => {
  const { user } = useUser();
  const [combinations, setCombinations] = useState<Player[][]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const handleGenerateCombinations = () => {
    const userClub = user?.club || "";
    const result = generateCombinations(players, positions, budget, userClub);
    console.log("Generated combinations:", result);
    setCombinations(result);
    setHasGenerated(true);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Propozycje transferowe
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGenerateCombinations}
        sx={{ mb: 4, borderRadius: 2, fontWeight: "bold", textTransform: "none" }}
      >
        Generuj Propozycje
      </Button>

      <Box>
        {!hasGenerated ? (
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Kliknij 'Zatwierdź', a później 'Generuj Propozycje', aby zobaczyć wyniki.
          </Typography>
        ) : combinations.length === 0 ? (
          <Typography variant="body1" color="error.main" sx={{ fontWeight: 500 }}>
            Nie znaleziono żadnych propozycji. Może warto zmienić kryteria wyszukiwania.
          </Typography>
        ) : (
          combinations.map((combo, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ mb: 4, p: 3, borderRadius: 3, backgroundColor: "#fff" }}
            >
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Propozycja nr {index + 1}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <PlayerTable players={combo} />
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CombinationResults;