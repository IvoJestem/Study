import React from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import { useUser } from "../../contexts/UseUser";

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const NoAccess: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0A1929", 
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(211, 47, 47, 0.15) 0%, transparent 60%)",
        padding: 3,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          sx={{
            padding: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderTop: "6px solid #d32f2f", 
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              mb: 3,
              animation: `${shake} 0.5s ease-in-out`,
            }}
          >
            <BlockIcon sx={{ fontSize: 80, color: "#d32f2f" }} />
          </Box>

          <Typography
            variant="overline"
            sx={{ color: "#d32f2f", fontWeight: 900, letterSpacing: 3, display: "block" }}
          >
            Odmowa dostępu
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: 900, color: "#0A1929", fontSize: "2rem" }}
          >
            Czerwona Kartka! 🟥
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary", fontWeight: 500, lineHeight: 1.6 }}>
            Twoja aktualna rola: <br />
            <Box component="span" sx={{ color: "#d32f2f", fontWeight: 800, fontSize: "1.2rem" }}>
              {user?.role || "Gość"}
            </Box>
          </Typography>

          <Typography variant="body2" sx={{ mb: 5, color: "text.disabled", fontWeight: 500 }}>
            Niestety, nie masz uprawnień, aby wejść na tę część murawy. Tylko wybrane role mogą zarządzać tym panelem.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              paddingY: 1.8,
              borderRadius: "50px",
              backgroundColor: "#0A1929",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(10, 25, 41, 0.3)",
              "&:hover": {
                backgroundColor: "#1e3c72",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 25px rgba(10, 25, 41, 0.4)",
              },
            }}
            onClick={handleBackHome}
          >
            Wróć do Bezpiecznej Strefy
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2, color: "text.secondary", fontWeight: 700, textTransform: "none" }}
            onClick={() => navigate(-1)} 
          >
            Wróć do poprzedniej strony
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NoAccess;