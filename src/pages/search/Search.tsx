import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Paper, 
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Player } from "../../types/Player";
import { SearchForm } from "../../components/Form/Form";
import CombinationResults from "../../components/CombinationResults/CombinationResults";
import { useNavigate } from "react-router-dom";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useUser } from "../../contexts/UseUser";

const Search: React.FC = () => {
  const { user } = useUser();
  const [players, setPlayers] = useState<Player[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

      <Box
        component="header"
        sx={{
          display: "flex", 
          alignItems: "center", 
          padding: "16px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "sticky", 
          top: 0, 
          zIndex: 10,
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        {isMobile && (
          <IconButton onClick={() => setIsMenuOpen(true)} sx={{ color: "#0A1929", mr: 2 }}>
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#0A1929", letterSpacing: 1 }}>
          ANALIZA I SYMULACJE
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          pb: 6,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 6 } }}>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0A1929", display: "flex", alignItems: "center", gap: 2 }}>
              Symulacja Transferowa
              <QueryStatsIcon sx={{ color: "#00B4D8", fontSize: 35 }} />
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, maxWidth: "800px" }}>
              Skonfiguruj parametry wyszukiwania, określ budżet i pozwól naszemu algorytmowi znaleźć optymalne kombinacje zawodników do Twojego składu.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: 3 }}>
              {error}
            </Alert>
          )}

          <Paper 
            elevation={10} 
            sx={{ 
              padding: { xs: 3, md: 5 }, 
              borderRadius: 4,
              borderTop: "5px solid #00B4D8", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              backgroundColor: "#fff"
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 4, color: "#0A1929", borderBottom: "2px solid #f1f5f9", pb: 2 }}
            >
              Kryteria Skautingu
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
    </Box>
  );
};

export default Search;