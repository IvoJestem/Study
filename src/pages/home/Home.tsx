import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Container,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 0, 122, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 0, 122, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 0, 122, 0); }
`;

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleGetStartedClick = () => navigate("/transferlist");
  const handleLogoClick = () => navigate("/userprofilepage");

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", backgroundColor: "#f8fafc", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      
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
            <IconButton onClick={toggleMenu} sx={{ color: "#0A1929", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#0A1929", letterSpacing: 1, display: { xs: "none", sm: "block" } }}>
          SYSTEM TRANSFEROWY
        </Typography>
        <IconButton onClick={handleLogoClick} sx={{ color: "#0A1929", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
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
            pt: { xs: 15, md: 22 }, pb: { xs: 12, md: 18 },
            backgroundColor: "#0A1929",
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255, 0, 122, 0.1) 0%, transparent 40%)",
            color: "#fff",
            textAlign: "center",
            borderBottomLeftRadius: { xs: "30px", md: "80px" },
            borderBottomRightRadius: { xs: "30px", md: "80px" },
            boxShadow: "0 20px 40px rgba(10, 25, 41, 0.2)",
          }}
        >
          <Container maxWidth="md" sx={{ animation: `${fadeInUp} 1s ease-out forwards` }}>
            <Typography variant="overline" sx={{ color: "#00B4D8", fontWeight: 800, letterSpacing: 3, mb: 1, display: "block" }}>
              Nowa era zarządzania
            </Typography>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: "2.8rem", md: "4.5rem" }, lineHeight: 1.1 }}>
              Zbuduj Potęgę.<br />
              <Box component="span" sx={{ background: "-webkit-linear-gradient(45deg, #00B4D8, #FF007A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Zdominuj Rynek.
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.8, maxWidth: "700px", mx: "auto", lineHeight: 1.6 }}>
              Odkryj innowacyjne narzędzie skautingowe. Analizuj statystyki, negocjuj wartości zawodników i stwórz drużynę, która przejdzie do historii.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6, py: 2, fontSize: "1.1rem", fontWeight: 800, borderRadius: "50px",
                backgroundColor: "#FF007A", animation: `${pulse} 2s infinite`,
                "&:hover": { backgroundColor: "#D80065", transform: "translateY(-3px)", boxShadow: "0 10px 20px rgba(255,0,122,0.3)" },
                transition: "all 0.3s ease",
              }}
              onClick={handleGetStartedClick}
            >
              Wejdź na Rynek
            </Button>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: { xs: -5, md: -8 }, position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, bgcolor: "#fff", p: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            {[
              { label: "Baza Zawodników", value: "10 000+", icon: <GroupIcon color="primary" /> },
              { label: "Aktywne Kluby", value: "500+", icon: <EmojiEventsIcon sx={{ color: "#FFD700" }} /> },
              { label: "Aktualizacje Rynku", value: "24/7", icon: <QueryStatsIcon color="success" /> }
            ].map((stat, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, p: 2 }}>
                <Box sx={{ bgcolor: "rgba(0,0,0,0.04)", p: 1.5, borderRadius: "50%", display: "flex" }}>{stat.icon}</Box>
                <Box textAlign="left">
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0A1929" }}>{stat.value}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 10, mb: 12 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 900, mb: 2, color: "#0A1929" }}>
            Twój arsenał menedżera
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary", mb: 8, maxWidth: "600px", mx: "auto" }}>
            Zapewniamy narzędzia, które pozwolą Ci wyprzedzić konkurencję w drodze po trofea.
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
            {[
              { title: "Baza Skautingowa", desc: "Dostęp do szczegółowych danych graczy z całego świata. Odkryj ukryte talenty zanim zrobią to inni.", icon: <QueryStatsIcon sx={{ fontSize: 50, color: "#00B4D8" }} /> },
              { title: "Giełda Transferowa", desc: "Monitoruj rynek na żywo. Kupuj taniej, sprzedawaj drożej i kontroluj finanse swojego klubu.", icon: <TrendingUpIcon sx={{ fontSize: 50, color: "#FF007A" }} /> },
              { title: "Taktyka i Skład", desc: "Wizualizuj głębię swojej kadry. Nasze wykresy analityczne wskażą Ci pozycje wymagające wzmocnień.", icon: <SportsSoccerIcon sx={{ fontSize: 50, color: "#1976d2" }} /> }
            ].map((feature, i) => (
              <Card key={i} sx={{
                p: 5, borderRadius: 5, textAlign: "center", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                transition: "all 0.4s ease", position: "relative", overflow: "hidden",
                "&:hover": { transform: "translateY(-10px)", boxShadow: "0 20px 50px rgba(0,180,216,0.15)", "& .icon-box": { transform: "scale(1.1)" } }
              }}>
                <Box className="icon-box" sx={{ bgcolor: "rgba(0, 180, 216, 0.08)", width: 90, height: 90, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3, transition: "transform 0.4s ease" }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#0A1929" }}>{feature.title}</Typography>
                <Typography color="textSecondary" sx={{ lineHeight: 1.7 }}>{feature.desc}</Typography>
              </Card>
            ))}
          </Box>
        </Container>
        <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, textAlign: "center", mb: -1 }}>
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>Gotowy na pierwszy transfer?</Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>Nie czekaj, aż inni zgarną najlepszych zawodników sprzed nosa.</Typography>
            <Button variant="contained" size="large" onClick={handleGetStartedClick} sx={{ px: 6, py: 1.5, bgcolor: "white", color: "primary.main", fontWeight: 800, fontSize: "1.1rem", "&:hover": { bgcolor: "#f1f5f9" } }}>
              Zaczynamy
            </Button>
          </Container>
        </Box>
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: "#0A1929", color: "#fff", py: 6, 
          marginLeft: isMobile ? 0 : `${drawerWidth}px` 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: 4 }}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 1 }}>SYSTEM TRANSFEROWY</Typography>
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>Oficjalne narzędzie skautingowe © {new Date().getFullYear()}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography component="a" href="#" sx={{ color: "white", opacity: 0.7, textDecoration: "none", fontWeight: 600, "&:hover": { opacity: 1, color: "#00B4D8" } }}>O nas</Typography>
              <Typography component="a" href="#" sx={{ color: "white", opacity: 0.7, textDecoration: "none", fontWeight: 600, "&:hover": { opacity: 1, color: "#00B4D8" } }}>Regulamin</Typography>
              <Typography component="a" href="mailto:mail@mail.pl" sx={{ color: "white", opacity: 0.7, textDecoration: "none", fontWeight: 600, "&:hover": { opacity: 1, color: "#00B4D8" } }}>Kontakt</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;