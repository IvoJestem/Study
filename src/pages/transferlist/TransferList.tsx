import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CardTable from "../../components/CardTable/CardTable";
import { Player } from "../../types/Player";
import { useUser } from "../../components/UseUser/UseUser";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const TransferList: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [clubPlayers, setClubPlayers] = useState<Player[]>([]);
  const [price, setPrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("tys");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transferlist`);
      if (!response.ok) throw new Error("Nie udało się pobrać listy zawodników.");
      const data = await response.json();
      const mappedData: Player[] = data.map((item: any[]) => ({
        id: item[0],
        name: item[1],
        position: item[2],
        age: item[3],
        nation: item[4],
        club: item[5],
        price: item[6],
      }));
      setCards(mappedData);
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const fetchClubPlayers = async () => {
    if (!user?.club) return;
    try {
      const response = await fetch(`http://localhost:5000/players/${user.club}`);
      if (!response.ok) throw new Error("Błąd pobierania kadry klubu.");
      const data = await response.json();
      const mappedData: Player[] = data.map((item: any[]) => ({
        id: item[0],
        name: item[1],
        position: item[2],
        age: item[3],
        nation: item[4],
        club: item[5],
        price: item[6],
      }));
      setClubPlayers(mappedData.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  useEffect(() => {
    fetchClubPlayers();
    fetchPlayers();
  }, [user?.club]);

  const handlePlayerChange = (event: SelectChangeEvent<number>) => {
    const playerId = event.target.value as number;
    const player = clubPlayers.find((p) => p.id === playerId) || null;
    setSelectedPlayer(player);
    setIsDialogOpen(true);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(",", ".");
    if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
      setPrice(value.replace(".", ","));
    }
  };

  const handleBlur = () => {
    if (unit === "mln" && price && !price.includes(",")) {
      setPrice(price + ",00");
    }
  };

  const handleAddPlayerToTransferList = async () => {
    if (!selectedPlayer || !price) {
      setSnackbar({ open: true, message: "Wypełnij cenę zawodnika!", severity: "error" });
      return;
    }

    let formattedPrice = price;
    if (unit === "mln" && !formattedPrice.includes(",")) {
      formattedPrice += ",00";
    }

    try {
      const response = await fetch("http://localhost:5000/transferlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPlayer.id,
          name: selectedPlayer.name,
          position: selectedPlayer.position,
          age: selectedPlayer.age,
          nation: selectedPlayer.nation,
          club: selectedPlayer.club,
          price: `${formattedPrice} ${unit}`,
        }),
      });

      if (!response.ok) throw new Error("Błąd podczas dodawania na listę.");

      setSnackbar({ open: true, message: "Zawodnik wystawiony na sprzedaż!", severity: "success" });
      fetchPlayers();
      fetchClubPlayers();
      handleDialogClose();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPlayer(null);
    setPrice("");
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
          Rynek Transferowy
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
            Wystaw zawodnika
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Wybierz zawodnika z kadry</InputLabel>
            <Select
              value={selectedPlayer?.id || ""}
              onChange={handlePlayerChange}
              label="Wybierz zawodnika z kadry"
            >
              {clubPlayers.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name} ({player.position})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ p: 2, backgroundColor: "primary.main", color: "white" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Aktualna Lista Transferowa</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <CardTable cards={cards} />
          </Box>
        </Paper>
      </Container>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Wystaw zawodnika na sprzedaż</DialogTitle>
        <DialogContent dividers>
          {selectedPlayer && (
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField label="Zawodnik" value={selectedPlayer.name} fullWidth disabled variant="filled" />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Pozycja" value={selectedPlayer.position} fullWidth disabled variant="filled" />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Wiek" value={selectedPlayer.age} fullWidth disabled variant="filled" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <TextField
                    label={`Cena (${unit})`}
                    value={price}
                    onChange={handlePriceChange}
                    onBlur={handleBlur}
                    fullWidth
                    autoFocus
                  />
                  <FormControl sx={{ minWidth: 100 }}>
                    <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                      <MenuItem value="tys">tys</MenuItem>
                      <MenuItem value="mln">mln</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleDialogClose} color="inherit">Anuluj</Button>
          <Button onClick={handleAddPlayerToTransferList} variant="contained" color="primary">Zatwierdź ofertę</Button>
        </DialogActions>
      </Dialog>

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

export default TransferList;