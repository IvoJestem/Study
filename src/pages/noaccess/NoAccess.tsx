import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import { useUser } from "../../components/UseUser/UseUser";

const NoAccess: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleBackHome = () => {
    navigate("/home");
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
      <BlockIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          color: "error.main",
          fontSize: { xs: "3rem", md: "5rem" },
          mb: 2,
        }}
      >
        Brak dostępu
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Odmowa autoryzacji
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: "500px" }}
      >
        Twoja rola („{user?.role || "Gość"}”) nie uprawnia Cię do przeglądania tej zawartości.
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
        Wróć na stronę główną
      </Button>
    </Container>
  );
};

export default NoAccess;