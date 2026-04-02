import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Container,
  Card,
  useTheme,
  useMediaQuery} from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; 
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"; 
import LanguageIcon from "@mui/icons-material/Language"; 
import FactCheckIcon from "@mui/icons-material/FactCheck"; 

import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
      
      <Box
        component="header"
        sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 10, position: "fixed", top: 0, 
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Box>
          {isMobile && (
            <IconButton onClick={() => setIsMenuOpen(true)} sx={{ color: "#0A1929" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#0A1929", letterSpacing: 1 }}>
            <Box component="span" sx={{ fontWeight: 900, color: "#00B4D8" }}>A</Box>lternative{" "}
            <Box component="span" sx={{ fontWeight: 900, color: "#00B4D8" }}>T</Box>ransfer{" "}
            <Box component="span" sx={{ fontWeight: 900, color: "#00B4D8" }}>L</Box>ogic{" "}
            <Box component="span" sx={{ fontWeight: 900, color: "#00B4D8" }}>A</Box>nalysis{" "}
            <Box component="span" sx={{ fontWeight: 900, color: "#00B4D8" }}>S</Box>ystem
          </Typography>
        <IconButton onClick={() => navigate("/profile")} sx={{ color: "#0A1929" }}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box 
        component="main" 
        sx={{ 
          marginLeft: isMobile ? 0 : `${drawerWidth}px`, 
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        
        <Box
          sx={{
            position: "relative",
            pt: { xs: 15, md: 20 }, pb: { xs: 12, md: 15 },
            backgroundColor: "#0A1929",
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 40%)",
            color: "#fff",
            textAlign: "center",
            borderBottomLeftRadius: { xs: "30px", md: "80px" },
            borderBottomRightRadius: { xs: "30px", md: "80px" },
          }}
        >
          <Container maxWidth="md" sx={{ animation: `${fadeInUp} 1s ease-out forwards` }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: "2.5rem", md: "4rem" }, lineHeight: 1.1 }}>
              Uczciwy Rynek.<br />
              <Box component="span" sx={{ color: "#00B4D8" }}>Bez Monopolu.</Box>
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.8, maxWidth: "750px", mx: "auto", lineHeight: 1.6 }}>
              Projekt stworzony, by uzdrowić procesy transferowe w polskich klubach. 
              Dostarczamy elastyczność i dane tam, gdzie tradycyjne systemy stawiają bariery.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6, py: 2, fontSize: "1.1rem", fontWeight: 800, borderRadius: "50px",
                backgroundColor: "#00B4D8",
                "&:hover": { backgroundColor: "#0077B6", transform: "translateY(-3px)" },
              }}
              onClick={() => navigate("/search")}
            >
              Uruchom Symulację Rynku
            </Button>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 10, mb: 15 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 900, mb: 8, color: "#0A1929" }}>
            Dlaczego ten projekt powstał?
          </Typography>

          <Box 
            display="grid" 
            gridTemplateColumns={{ 
              xs: "1fr",          
              sm: "repeat(2, 1fr)", 
              md: "repeat(4, 1fr)"  
            }} 
            gap={4}
          >
            <Box>
              <Card sx={{ p: 4, height: "100%", borderRadius: 5, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <CompareArrowsIcon sx={{ fontSize: 50, color: "#00B4D8", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Usprawnienie procesu</Typography>
                <Typography variant="body2" color="text.secondary">
                  Złożone systemy globalne bywają nieintuicyjne. Oferujemy narzędzie skrojone pod realne potrzeby lokalnych klubów.
                </Typography>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: 4, height: "100%", borderRadius: 5, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <AutoAwesomeIcon sx={{ fontSize: 50, color: "#FF007A", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Moduł Symulacyjny</Typography>
                <Typography variant="body2" color="text.secondary">
                  Standardowe systemy federacyjne nie pozwalają na testowanie scenariuszy. U nas sprawdzisz skutki decyzji, zanim je podejmiesz.
                </Typography>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: 4, height: "100%", borderRadius: 5, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <LanguageIcon sx={{ fontSize: 50, color: "#0A1929", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Wsparcie Niezależności</Typography>
                <Typography variant="body2" color="text.secondary">
                  W obliczu zmian w światowej piłce, kluby potrzebują własnych, niezależnych systemów zarządzania kadrą.
                </Typography>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: 4, height: "100%", borderRadius: 5, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <FactCheckIcon sx={{ fontSize: 50, color: "#2e7d32", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Koniec Monopolu</Typography>
                <Typography variant="body2" color="text.secondary">
                  Wprowadzamy nową jakość tam, gdzie dotąd panował brak przejrzystości. Transparentność danych to nasza największa wartość.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Container>

        <Box sx={{ bgcolor: "#0A1929", color: "white", py: 10, textAlign: "center", borderTopLeftRadius: "40px", borderTopRightRadius: "40px" }}>
          <Container maxWidth="md">
            <SecurityIcon sx={{ fontSize: 60, color: "#00B4D8", mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>Wspólnie przeciw korupcji</Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, fontSize: "1.1rem", lineHeight: 1.8 }}>
              Polska piłka zasługuje na przejrzystość. Każda transakcja w naszym systemie zostawia niezatarty ślad cyfrowy, 
              uniemożliwiając zakulisowe układy i sztuczne zawyżanie cen zawodników.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;