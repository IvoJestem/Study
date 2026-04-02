import React from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const NotLoggedInPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
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
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255, 0, 122, 0.1) 0%, transparent 50%)",
        padding: 3
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            padding: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderTop: "6px solid #FF007A", 
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 0, 122, 0.05)",
              mb: 3,
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 70, color: "#FF007A" }} />
          </Box>

          <Typography
            variant="overline"
            sx={{ color: "#00B4D8", fontWeight: 900, letterSpacing: 2, display: "block" }}
          >
            Brak dostępu
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: 900, color: "#0A1929" }}
          >
            Oopsie! 😅
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary", fontWeight: 500, lineHeight: 1.6 }}>
            Wygląda na to, że próbujesz wejść na murawę bez ważnej przepustki. 
            Twoja sesja wygasła lub nie jesteś zalogowany.
          </Typography>

          <Typography variant="body2" sx={{ mb: 4, color: "text.disabled", fontStyle: "italic" }}>
            Nie martw się, to tylko krótka przerwa w grze! Zaloguj się, aby kontynuować skauting.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              paddingY: 1.8,
              borderRadius: "50px",
              backgroundColor: "#FF007A",
              fontWeight: 800,
              fontSize: "1.1rem",
              textTransform: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(255, 0, 122, 0.3)",
              "&:hover": {
                backgroundColor: "#D80065",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 25px rgba(255, 0, 122, 0.4)",
              },
            }}
            onClick={handleLoginRedirect}
          >
            Wróć do Logowania
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2, color: "text.secondary", fontWeight: 700, textTransform: "none" }}
            onClick={() => navigate("/home")}
          >
            Wróć na Stronę Główną
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotLoggedInPage;