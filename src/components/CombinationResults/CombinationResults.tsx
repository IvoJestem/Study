import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import { Player } from "../../components/Database/Database";
import generateCombinations from "../../utils/Combinations/combinations";
import PlayerTable from "../PlayerTable/PlayerTable";

const CombinationResults: React.FC<{
  players: Player[];
  positions: string[];
  budget: number;
}> = ({ players, positions, budget }) => {
  const [combinations, setCombinations] = useState<Player[][]>([]);

  const handleGenerateCombinations = () => {
    const result = generateCombinations(players, positions, budget);
    setCombinations(result);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Propozycje transferowe
      </Typography>
      <Button variant="contained" onClick={handleGenerateCombinations}>
        Generuj Propozycje
      </Button>
      {combinations.length > 0 && (
        <Box mt={2}>
          {combinations.map((combo, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6">Propozycja nr {index + 1}</Typography>
              <PlayerTable players={combo} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CombinationResults;
