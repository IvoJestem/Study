import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  useTheme,
  Container,
  Grid,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";

import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Zamiast alertu, nawigacja np. do listy transferowej
  const handleGetStartedClick = () => {
    navigate("/transferlist");
  };

  const handleLogoClick = () => {
    navigate("/userprofilepage");
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f4f7f6", // Delikatniejszy, nowocześniejszy szary
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
          zIndex: 10,
          position: "sticky",
          top: 0,
        }}
      >
        <IconButton onClick={toggleMenu} sx={{ color: theme.palette.primary.main }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={handleLogoClick} sx={{ color: theme.palette.primary.main }}>
          <AccountCircle fontSize="large" />
        </IconButton>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
          flexGrow: 1,
          pb: 6,
        }}
      >
        {/* HERO SECTION */}
        <Box
          sx={{
            textAlign: "center",
            padding: { xs: "60px 20px", md: "100px 20px" },
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Bardziej profesjonalny granat
            color: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
              Zarządzaj Transferami <br /> Jak Profesjonalista
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 300, opacity: 0.9 }}>
              Innowacyjne narzędzie dla klubów, menedżerów i pasjonatów piłki nożnej.
              Buduj swój wymarzony skład i analizuj rynek w czasie rzeczywistym.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                paddingX: 5,
                paddingY: 1.5,
                fontSize: "1.1rem",
                backgroundColor: "#ff4081", // Ciekawy akcent kolorystyczny (Róż/Magenta)
                "&:hover": { backgroundColor: "#f50057" },
              }}
              onClick={handleGetStartedClick}
            >
              Rozpocznij
            </Button>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: -5 }}>
          {/* CARDS / OFFERINGS SECTION */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderRadius: 3 }}>
                <GroupIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Baza Zawodników</Typography>
                <Typography color="textSecondary">
                  Uzyskaj dostęp do szerokiej listy graczy, przeglądaj ich statystyki, pozycje i wartość rynkową w jednym miejscu.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderRadius: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Analiza Rynku</Typography>
                <Typography color="textSecondary">
                  Śledź trendy transferowe, sprawdzaj, kto jest na liście i dokonuj trafnych decyzji na podstawie twardych danych.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", textAlign: "center", p: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderRadius: 3 }}>
                <SportsSoccerIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Zarządzaj Składem</Typography>
                <Typography color="textSecondary">
                  Kupuj i sprzedawaj zawodników, optymalizuj budżet swojego klubu i zbuduj drużynę gotową na mistrzostwo.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* ABOUT US TEXT */}
          <Box sx={{ mb: 8, textAlign: "center", padding: "0 20px" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
              Nasza Misja
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "800px", margin: "0 auto", lineHeight: 1.8 }}>
              Wierzymy, że sport to nie tylko rywalizacja na boisku, ale również strategiczne decyzje podejmowane poza nim.
              Tworząc naszą aplikację, chcemy wspierać kluby, menedżerów i pasjonatów futbolu w efektywnym budowaniu zespołów.
              Nasz system umożliwia dodawanie zawodników do list transferowych, analizowanie ich wartości rynkowej oraz
              skuteczne zarządzanie procesem transferowym. Razem możemy rewolucjonizować sposób, w jaki zarządzamy
              transferami piłkarskimi!
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#fff",
          padding: "40px 20px",
          borderTop: `1px solid #e0e0e0`,
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {/* Nav Links */}
            <Grid item xs={12} sm={4} textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Nawigacja</Typography>
              <Button color="inherit" onClick={() => window.scrollTo(0, 0)} sx={{ display: "block", mb: 1 }}>Strona Główna</Button>
              <Button color="inherit" onClick={() => window.open("../../../public/services.pdf", "_blank")} sx={{ display: "block", mb: 1 }}>Usługi</Button>
              <Button color="inherit" onClick={() => window.open("mailto:mail@mail.pl")} sx={{ display: "block" }}>Kontakt</Button>
            </Grid>

            {/* Social Media */}
            <Grid item xs={12} sm={4} textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Obserwuj nas</Typography>
              <Button color="primary" onClick={() => window.open("https://www.facebook.com", "_blank")} sx={{ display: "block", mb: 1 }}>Facebook</Button>
              <Button color="primary" onClick={() => window.open("https://twitter.com", "_blank")} sx={{ display: "block", mb: 1 }}>Twitter</Button>
              <Button color="primary" onClick={() => window.open("https://www.instagram.com", "_blank")} sx={{ display: "block" }}>Instagram</Button>
            </Grid>
          </Grid>
          <Box textAlign="center" sx={{ mt: 4, pt: 2, borderTop: "1px solid #eee" }}>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} System Transferowy. Wszelkie prawa zastrzeżone.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;