import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Snackbar, 
  Alert, 
  Paper, 
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CardTable from "../../components/CardTable/CardTable";
import { Player } from "../../types/Player";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const TransferList: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<Player[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transferlist`);
      if (!response.ok) throw new Error("Nie udało się pobrać listy zawodników.");
      const data = await response.json();
      const mappedData: Player[] = data.map((item: any) => ({
        id: item.ID || item[0],
        name: item.NAME || item[1],
        position: item.POSITION || item[2],
        age: item.AGE || item[3],
        nation: item.NATION || item[4],
        club: item.CLUB || item[5],
        price: item.PRICE || item[6],
      }));
      setCards(mappedData);
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

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
          GIEŁDA TRANSFEROWA
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
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0A1929" }}>
              Dostępni Zawodnicy
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
              Przeglądaj, obserwuj i analizuj graczy wystawionych na sprzedaż przez inne kluby.
            </Typography>
          </Box>

          <Paper 
            elevation={10} 
            sx={{ 
              borderRadius: 4, 
              overflow: "hidden",
              borderTop: "5px solid #00B4D8",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >
            <Box sx={{ p: 3, backgroundColor: "#0A1929", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Aktualne Oferty
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 600 }}>
                Znaleziono: {cards.length}
              </Typography>
            </Box>
            
            <Box sx={{ p: 2, backgroundColor: "white" }}>
              <CardTable cards={cards} />
            </Box>
          </Paper>

        </Container>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TransferList;