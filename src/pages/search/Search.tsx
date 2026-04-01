import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Alert, Paper, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Player } from "../../types/Player";
import { SearchForm } from "../../components/Form/Form";
import CombinationResults from "../../components/CombinationResults/CombinationResults";
import { useUser } from "../../components/UseUser/UseUser";
import { useNavigate } from "react-router-dom";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const Search: React.FC = () => {
  const { user } = useUser();
  const [players, setPlayers] = useState<Player[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role === "Agent") {
      navigate("/noaccess");
      return;
    }

    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/transferlist");
        if (!response.ok) {
          throw new Error("Wystąpił błąd podczas pobierania danych z serwera.");
        }
        const data = await response.json();
        
        const mappedData: Player[] = data.map((item: any[]) => ({
          id: item[0],
          name: item[1],
          position: item[2],
          age: item[3],
          nation: item[4],
          club: item[5],
          price: item[6],
        }));
        setPlayers(mappedData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPlayers();
  }, [user, navigate]);

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

  if (!user || user.role === "Agent") return null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 6 }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => setIsMenuOpen(true)}
          sx={{ color: "primary.main", mr: 2 }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
          Symulacja Transferowa
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3} sx={{ padding: { xs: 3, md: 5 }, borderRadius: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 4, textAlign: "center", color: "text.primary" }}
          >
            Wyszukiwarka Zawodników
          </Typography>

          <SearchForm onSearchPlayer={handleSearchPlayer} />

          <Box sx={{ mt: 6 }}>
            <CombinationResults
              players={players}
              positions={positions}
              budget={budget}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Search;