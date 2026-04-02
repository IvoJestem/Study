import React, { useState } from "react";
import { Box, Typography, Button, Paper, Divider, Alert } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import generateCombinations from "../../utils/Combinations/combinations";
import PlayerTable from "../PlayerTable/PlayerTable";
import { Player } from "../../types/Player";
import { useUser } from "../../contexts/UseUser";

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
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 4, gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#0A1929" }}>
          Propozycje Transferowe
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateCombinations}
          sx={{
            borderRadius: "50px",
            px: 4,
            py: 1.5,
            fontWeight: 800,
            backgroundColor: "#00B4D8",
            color: "#fff",
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(0, 180, 216, 0.3)",
            "&:hover": {
              backgroundColor: "#008ba8",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 25px rgba(0, 180, 216, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Generuj Opcje
        </Button>
      </Box>

      <Box>
        {!hasGenerated ? (
          <Box 
            sx={{ 
              p: 5, textAlign: "center", bgcolor: "#f8fafc", 
              borderRadius: 4, border: "2px dashed #cbd5e1" 
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 50, color: "#94a3b8", mb: 2 }} />
            <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600, fontSize: "1.1rem" }}>
              Określ kryteria w formularzu powyżej, zatwierdź je, a następnie kliknij przycisk „Generuj Opcje”, aby uruchomić algorytm skautingowy.
            </Typography>
          </Box>
        ) : combinations.length === 0 ? (
          <Alert 
            icon={<SearchOffIcon sx={{ fontSize: 28 }} />}
            severity="warning" 
            sx={{ 
              borderRadius: 3, 
              p: 3, 
              fontSize: "1.05rem", 
              backgroundColor: "rgba(255, 152, 0, 0.1)",
              border: "1px solid rgba(255, 152, 0, 0.3)",
              fontWeight: 600
            }}
          >
            Algorytm nie znalazł żadnych kombinacji pasujących do podanych kryteriów i budżetu. Spróbuj zwiększyć budżet lub zmienić wymagane pozycje.
          </Alert>
        ) : (
          combinations.map((combo, index) => (
            <Paper
              key={index}
              elevation={10}
              sx={{ 
                mb: 4, 
                borderRadius: 4, 
                backgroundColor: "#fff",
                borderLeft: index % 2 === 0 ? "8px solid #00B4D8" : "8px solid #FF007A",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" }
              }}
            >
              <Box sx={{ p: 3, bgcolor: "rgba(10, 25, 41, 0.02)" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 900, color: "#0A1929", display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box component="span" sx={{ color: index % 2 === 0 ? "#00B4D8" : "#FF007A" }}>#</Box> 
                  Wariant {index + 1}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <PlayerTable players={combo} />
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CombinationResults;