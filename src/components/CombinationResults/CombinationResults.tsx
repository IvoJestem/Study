import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
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
    console.log("Generated combinations:", combinations);
     setCombinations(result);
    setHasGenerated(true);
  };
return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Propozycje transferowe
      </Typography>
      <Button variant="contained" onClick={handleGenerateCombinations}>
        Generuj Propozycje
      </Button>
      <Box mt={2}>
        {!hasGenerated ? (
          <Typography variant="body1" color="textSecondary">
            Kliknij 'Zatwierdź' a pózniej 'Generuj Propozycje', aby zobaczyć
            wyniki.
          </Typography>
        ) : combinations.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Nie znaleziono żadnych propozycji. Może warto zmienić kryteria
            wyszukiwania.{" "}
          </Typography>
        ) : (
          combinations.map((combo, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6">Propozycja nr {index + 1}</Typography>
              <PlayerTable players={combo} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CombinationResults;