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
} from "@mui/material";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import CardTable from "../../components/CardTable/CardTable";
import { Player } from "../../types/Player";
import { useUser } from "../../components/UseUser/UseUser";

const TransferList: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [clubPlayers, setClubPlayers] = useState<Player[]>([]);
 const [price, setPrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("tys");
  const [error, setError] = useState<string | null>(null);
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

   const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/players`);
      if (!response.ok) {
        throw new Error("Nie udało się pobrać listy zawodników.");
      }
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        setSnackbarOpen(true);
      }
    }
  };
    const fetchClubPlayers = async () => {
      if (!user || !user.club) return;
      try {
        const response = await fetch(`http://localhost:5000/transferlist/${user.club}`);
        if (!response.ok) {
                   throw new Error("Nie jesteś związany z klubem więc niektóre funkcje mogą być dla Ciebie niedostępne");
        }
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData: Player[] = data.map((item: any[]) => ({
          id: item[0],
          name: item[1],
          position: item[2],
          age: item[3],
          nation: item[4],
          club: item[5],
          price: item[6],
        }));
          mappedData.sort((a, b) => a.name.localeCompare(b.name));
        setClubPlayers(mappedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          setSnackbarOpen(true); 
        } else {
          setError("Wystąpił nieznany błąd");
          setSnackbarOpen(true);
        }
      }
    };

  useEffect(() => {

    fetchClubPlayers();
    fetchPlayers();
  },  );

  const handlePlayerChange = (event: SelectChangeEvent<number>) => {
    const playerId = event.target.value as number;
    const player = clubPlayers.find((p) => p.id === playerId) || null;
    setSelectedPlayer(player);
    setIsDialogOpen(true);
  };

const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.replace(",", "."); 
  if (/^\d{1,3}(\.\d{0,2})?$/.test(value)) {
    setPrice(value.replace(".", ",")); 
  }
};


const handleBlur = () => {
  if (unit === "mln" && price && !price.includes(",")) {
    setPrice(price + ",00"); 
  }
};




  const handleUnitChange = (event: SelectChangeEvent<string>) => {
  setUnit(event.target.value);
    setPrice(""); 
  };


const handleAddPlayerToTransferList = async () => {
  if (!selectedPlayer || !price) {
    alert("Wybierz zawodnika i podaj kwotę!");
    return;
  }


  let formattedPrice = price;
  if (unit === "mln") {

    if (!formattedPrice.includes(",")) {
      formattedPrice += ",00"; 
    }
  }

  try {
    const response = await fetch("http://localhost:5000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    if (!response.ok) {
      throw new Error("Błąd podczas dodawania zawodnika");
    }

    alert("Zawodnik został dodany do listy transferowej");

    await fetchPlayers();
    await fetchClubPlayers(); 
    setPrice("");
    setIsDialogOpen(false);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error:", err);
      alert("Wystąpił problem przy dodawaniu zawodnika: " + err.message);
    } else {
      alert("Wystąpił nieznany błąd");
    }
  }
};
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPlayer(null);
    setPrice("");
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
        Lista Transferowa
      </Typography>
    </Box>

    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="player-select-label">Wybierz zawodnika</InputLabel>
        <Select
          labelId="player-select-label"
          value={selectedPlayer ? selectedPlayer.id : ""}
          onChange={handlePlayerChange}
          label="Wybierz zawodnika"
        >
          {clubPlayers.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.name} - {player.position}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Wystaw zawodnika na sprzedaż</DialogTitle>
      <DialogContent>
        {selectedPlayer && (
          <>
            <TextField
              label="Imię i nazwisko"
              value={selectedPlayer.name}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Pozycja"
              value={selectedPlayer.position}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Wiek"
              value={selectedPlayer.age}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Narodowość"
              value={selectedPlayer.nation}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Klub"
              value={selectedPlayer.club}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Nowe sekcje dla budżetu i jednostki */}
 <Box
  sx={{
    display: "flex",
    alignItems: "center",  
    gap: 2,
    marginTop: 2,
  }}
>
<TextField
  label={`Cena (${unit})`}
  value={price}
  onChange={handlePriceChange}
  onBlur={handleBlur} 
  fullWidth
  sx={{
    marginBottom: 0,
  }}
/>


  <FormControl sx={{ width: "120px", marginBottom: 0 }}>
    <Select
      labelId="unit-label"
      value={unit}
      onChange={handleUnitChange}
      fullWidth
    >
      <MenuItem value="tys">tys</MenuItem>
      <MenuItem value="mln">mln</MenuItem>
    </Select>
  </FormControl>
</Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Anuluj
        </Button>
        <Button onClick={handleAddPlayerToTransferList} color="primary">
          Dodaj do listy transferowej
        </Button>
      </DialogActions>
    </Dialog>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={error || "Wystąpił błąd!"}
    />

    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <CardTable cards={cards} />
    </Box>
  </Container>
);
}
export default TransferList;