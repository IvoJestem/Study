import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/login");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          color: "error.main",
          fontSize: { xs: "5rem", md: "8rem" },
        }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Coś poszło nie tak...
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: "500px" }}
      >
        Strona, której szukasz, nie istnieje, została usunięta lub wystąpił nieoczekiwany błąd.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleBackHome}
        sx={{
          borderRadius: 2,
          paddingX: 4,
          paddingY: 1.5,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1.1rem",
        }}
      >
        Wróć na stronę logowania
      </Button>
    </Container>
  );
};

export default Error404;