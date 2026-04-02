import React from "react";
import { Container, Box, Typography, IconButton, Paper } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../../contexts/UseUser";

const UserProfilePage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.secondary" }}>
          Proszę się zalogować.
        </Typography>
      </Box>
    );
  }

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
        }}
      >
        <IconButton 
          onClick={() => navigate("/home")} 
          sx={{ 
            color: "#0A1929", 
            mr: 2,
            transition: "transform 0.2s",
            "&:hover": { transform: "translateX(-4px)", backgroundColor: "rgba(0,0,0,0.04)" }
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#0A1929", letterSpacing: 1 }}>
          PROFIL UŻYTKOWNIKA
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 }, pb: 8 }}>
        
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 45, color: "#00B4D8" }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0A1929" }}>
              Twoja Karta
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5 }}>
              Zarządzaj swoimi danymi, ustawieniami konta i preferencjami.
            </Typography>
          </Box>
        </Box>

        <Paper 
          elevation={10} 
          sx={{ 
            borderRadius: 4, 
            overflow: "hidden",
            borderTop: "5px solid #FF007A", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            backgroundColor: "#fff",
            p: { xs: 3, md: 5 }
          }}
        >
          <UserProfile />
        </Paper>
        
      </Container>
    </Box>
  );
};

export default UserProfilePage;