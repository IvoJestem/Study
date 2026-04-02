import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Alert, 
  Box, 
  IconButton,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Player } from "../../types/Player";

import axios from "axios";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import CardTable from "../../components/CardTable/CardTable";
import { useUser } from "../../contexts/UseUser";

const ShortlistPage: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [observed, setObserved] = useState<Player[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  useEffect(() => {
    const fetchShortlist = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/shortlist?phone=${user.phone}`);
        
        const mappedData = res.data.map((item: any) => ({
          id: item.ID || item[0],
          name: item.NAME || item[1],
          position: item.POSITION || item[2],
          age: item.AGE || item[3],
          nation: item.NATION || item[4],
          club: item.CLUB || item[5],
          price: item.PRICE || item[6],
        }));
        
        setObserved(mappedData);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchShortlist();
    const interval = setInterval(fetchShortlist, 2000); 
    return () => clearInterval(interval);
  }, [user]);

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
          RAPORT SKAUTA
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
              Twoja Shortlista
              <FavoriteIcon sx={{ color: "#FF007A", fontSize: 35 }} />
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
              Bacznie obserwuj tych zawodników. Kto wie, może wkrótce zasilą Twoje szeregi?
            </Typography>
          </Box>
          
          {observed.length > 0 ? (
            <Paper 
              elevation={10} 
              sx={{ 
                borderRadius: 4, 
                overflow: "hidden",
                borderTop: "5px solid #FF007A",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              <Box sx={{ p: 3, backgroundColor: "#0A1929", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Obserwowani Zawodnicy
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 600 }}>
                  Liczba graczy: {observed.length}
                </Typography>
              </Box>
              
              <Box sx={{ p: 2, backgroundColor: "white" }}>
                <CardTable cards={observed} />
              </Box>
            </Paper>
          ) : (
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 3, 
                p: 3, 
                fontSize: "1.1rem", 
                backgroundColor: "rgba(0, 180, 216, 0.1)",
                color: "#0A1929",
                border: "1px solid rgba(0, 180, 216, 0.3)",
                "& .MuiAlert-icon": {
                  color: "#00B4D8",
                  fontSize: "2rem"
                }
              }}
            >
              <strong>Brak raportów skautingowych.</strong> Nie obserwujesz jeszcze żadnych zawodników. Dodaj ich, używając ikony serca na Liście Transferowej!
            </Alert>
          )}
          
        </Container>
      </Box>
    </Box>
  );
};

export default ShortlistPage;