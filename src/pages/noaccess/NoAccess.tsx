import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoAccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/home"); // Przekierowanie na stronę główną
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "10%" }}>
      <Box>
        <Typography variant="h1" color="error">
          Brak dostępu
        </Typography>
        <Typography variant="h4" gutterBottom>
          Nie masz dostępu do tej strony
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Twoja rola („Agent”) nie uprawnia Cię do przeglądania tej zawartości.
        </Typography>
        <Box marginTop={4}>
          <Button variant="contained" color="primary" onClick={handleBackHome}>
            Wróć na stronę główną
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NoAccess;
