import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfilePage: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          User Profile
        </Typography>
        <UserProfile />
        <Box mt={2} textAlign="center">
          <a href="../home">
            <Button variant="contained" color="primary">
              Przejdź do Strony Głównej
            </Button>
          </a>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
