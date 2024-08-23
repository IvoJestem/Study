import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "10%" }}>
      <Box>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Coś poszło nie tak...
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Strona, której szukasz, nie istnieje lub wystąpił nieoczekiwany błąd.
        </Typography>
        <Box marginTop={4}>
          <Button variant="contained" color="primary" onClick={handleBackHome}>
            Wróć na stronę logowania
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Error404;
