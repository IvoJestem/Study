import { Container, Typography, Box, Button } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfilePage: React.FC = () => {
  const { user } = useUser(); // Access user data from context
  const navigate = useNavigate();

  // No need to fetch user data here if UserProfile already handles it
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("/api/user");
  //       setUser(response.data);
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //     }
  //   };

  //   fetchUser();
  // }, [setUser]);

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
