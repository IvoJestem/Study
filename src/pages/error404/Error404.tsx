import React from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/login");
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
          "radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, transparent 70%)",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            padding: { xs: 4, md: 8 },
            textAlign: "center",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderBottom: "8px solid #00B4D8",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: { xs: "10rem", md: "15rem" },
              fontWeight: 900,
              color: "rgba(0, 0, 0, 0.03)",
              zIndex: 0,
              userSelect: "none"
            }}
          >
            404
          </Typography>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "inline-flex",
                p: 2,
                mb: 2,
                animation: `${spin} 10s linear infinite`,
              }}
            >
              <SportsSoccerIcon sx={{ fontSize: 100, color: "#0A1929" }} />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                color: "#0A1929",
                fontSize: { xs: "4rem", md: "6rem" },
                lineHeight: 1,
                mb: 1
              }}
            >
              SPALONY!
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "#00B4D8" }}>
              Wybiegłeś poza pole gry.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: "400px", mx: "auto", fontWeight: 500, lineHeight: 1.6 }}
            >
              Strona, której szukasz, nie istnieje lub została przeniesiona do innej ligi. 
              Wróć do bazy i spróbuj ponownie.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleBackHome}
              sx={{
                borderRadius: "50px",
                paddingX: 6,
                paddingY: 2,
                fontWeight: 900,
                fontSize: "1.1rem",
                backgroundColor: "#0A1929",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 20px rgba(0, 180, 216, 0.2)",
                "&:hover": {
                  backgroundColor: "#00B4D8",
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 30px rgba(0, 180, 216, 0.4)",
                },
              }}
            >
              POWRÓT DO BAZY
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Error404;