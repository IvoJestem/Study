import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UseUser/UseUser";

const UserProfilePage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <Typography variant="h6">Proszę się zalogować.</Typography>;
  }

  return (
    <Container>
      <Box my={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          User Profile
        </Typography>
        <UserProfile />
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Przejdź do Strony Głównej
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
