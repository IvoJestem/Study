import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import { Player } from "../../types/Player";
import { useUser } from "../../components/UseUser/UseUser";

const Players: React.FC = () => {
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [clubPlayers, setClubPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  // Pobranie danych zawodników
  useEffect(() => {
    const fetchPlayersData = async () => {
        if (!user || !user.club) return;
      try {
        const response = await fetch(`http://localhost:5000/players/${user.club}`);
        if (!response.ok) {
          throw new Error("Nie jesteś związany z klubem więc niektóre funkcje mogą być dla Ciebie niedostępne");
        }
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedClubPlayers: Player[] = data.map((item: any[]) => ({
          id: item[0],
          name: item[1],
          position: item[2],
          age: item[3],
          nation: item[4],
          club: item[5],
          price: item[6],
        }));
        setClubPlayers(mappedClubPlayers);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd");
        setSnackbarOpen(true);
      }
    };

    if (user?.club) {
      console.log("Triggering useEffect with user?.club:", user.club); // Debugging
      fetchPlayersData();
    }
  }, [user?.club]);

  // Funkcja do usuwania zawodnika z listy transferowej
  const handleRemovePlayerFromTransferList = async (playerId: number) => {
  try {
    const player = clubPlayers.find((player) => player.id === playerId);

    if (!player) return;

    const response = await fetch(`http://localhost:5000/transferlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: player.id,
        name: player.name,
        position: player.position,
        age: player.age,
        nation: player.nation,
        club: player.club,
      }),
    });

    if (!response.ok) throw new Error("Błąd podczas przenoszenia zawodnika");

    // Aktualizacja danych po sukcesie
    const updatedClubPlayers = clubPlayers.filter((player) => player.id !== playerId);
    setClubPlayers(updatedClubPlayers);

    alert("Zawodnik został zdjęty z listy transferowej!");

  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd");
    setSnackbarOpen(true);
  }
};
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        transition: "margin-left 0.3s ease",
        marginLeft: isMenuOpen ? "250px" : "0",
      }}
    >
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          backgroundColor: "#fff",
          padding: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        {!isMenuOpen && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsMenuOpen(true)}
            sx={{
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            Open Menu
          </Button>
        )}
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Zawodnicy Na Liscie
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Zawodnicy w Twoim klubie:
        </Typography>
        {clubPlayers.map((player) => (
          <Box
            key={player.id}
            sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}
          >
            <Typography variant="body1">
              {player.name} - {player.position} - {player.club} - {player.price} $
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemovePlayerFromTransferList(player.id)}
            >
              Zdejmij
            </Button>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error || "Wystąpił błąd!"}
      />
    </Container>
  );
};

export default Players;
