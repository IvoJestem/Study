import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: { xs: 4, md: 6 },
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 2, fontWeight: 800, color: "text.primary" }}
        >
          Oopsie! 😅
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Wygląda na to, że próbujesz uzyskać dostęp do strony, ale nie jesteś
          jeszcze zalogowany. Czyżbyś zapomniał się zalogować? Nie martw się,
          zdarza się najlepszym z nas!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Aby kontynuować, musisz być zalogowany. Kliknij poniższy przycisk, aby
          przejść do strony logowania.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            paddingY: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1.1rem",
          }}
          onClick={handleLoginRedirect}
        >
          Zaloguj się
        </Button>
      </Paper>
    </Box>
  );
};

export default NotLoggedInPage;