import React from "react";
import { Box, Typography, Button, useTheme, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotLoggedInPage: React.FC = () => {
  const theme = useTheme();
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
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          textAlign: "center",
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Oopsie! 😅
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Wygląda na to, że próbujesz uzyskać dostęp do strony, ale nie jesteś
          jeszcze zalogowany. Czyżbyś zapomniał się zalogować? Nie martw się,
          zdarza się najlepszym z nas!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Aby kontynuować, musisz być zalogowany. Kliknij poniższy przycisk, aby
          przejść do strony logowania.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ paddingX: 4 }}
          onClick={handleLoginRedirect}
        >
          Zaloguj się
        </Button>
      </Paper>
    </Box>
  );
};

export default NotLoggedInPage;
