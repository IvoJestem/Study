import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UseUser/UseUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserProfilePage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography variant="h6">Proszę się zalogować.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/home")}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Wróć do Strony Głównej
          </Button>
        </Box>
        <UserProfile />
      </Container>
    </Box>
  );
};

export default UserProfilePage;