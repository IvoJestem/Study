import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Player } from "../../types/Player";
import { useUser } from "../../components/UseUser/UseUser";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const Players: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [clubPlayers, setClubPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchPlayersData = async () => {
    if (!user || !user.club) return;
    try {
      const response = await fetch(`http://localhost:5000/transferlist/${user.club}`);
      if (!response.ok) {
        throw new Error("Brak powiązania z klubem lub błąd pobierania danych.");
      }
      const data = await response.json();
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
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    }
  };

  useEffect(() => {
    fetchPlayersData();
  }, [user?.club]);

  const handleRemovePlayerFromTransferList = async (playerId: number) => {
    try {
      const player = clubPlayers.find((p) => p.id === playerId);
      if (!player) return;

      const response = await fetch(`http://localhost:5000/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      setClubPlayers((prev) => prev.filter((p) => p.id !== playerId));
      setSnackbar({ open: true, message: "Zawodnik został zdjęty z listy!", severity: "success" });
    } catch (err: unknown) {
      setSnackbar({ 
        open: true, 
        message: err instanceof Error ? err.message : "Wystąpił błąd", 
        severity: "error" 
      });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 6 }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <IconButton onClick={() => setIsMenuOpen(true)} sx={{ color: "primary.main", mr: 2 }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
          Kadra Klubu
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: "text.primary" }}>
          Zawodnicy na liście transferowej
        </Typography>

        {error && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {clubPlayers.length > 0 ? (
            clubPlayers.map((player) => (
              <Paper
                key={player.id}
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 2,
                  transition: "0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {player.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {player.position} • {player.age} lat • <Box component="span" sx={{ fontWeight: "bold", color: "primary.main" }}>{player.price}</Box>
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemovePlayerFromTransferList(player.id)}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                >
                  Zdejmij z listy
                </Button>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
              Brak zawodników Twojego klubu na liście transferowej.
            </Typography>
          )}
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Players;