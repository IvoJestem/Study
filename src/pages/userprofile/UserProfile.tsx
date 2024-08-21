import React, { useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box, Button } from "@mui/material";
import UserProfile from "../../components/Profile/Profile";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${user?.email}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.error(response.data.error);
          navigate("../login"); // lub inny sposób obsługi błędu
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika", error);
        navigate("../login"); // lub inny sposób obsługi błędu
      }
    };

    if (user?.email) {
      fetchUser();
    }
  }, [user?.email, setUser, navigate]);

  if (!user) {
    return <Typography variant="h6">Proszę się zalogować.</Typography>;
  }

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
