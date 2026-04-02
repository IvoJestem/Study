import React, { useEffect, useState } from "react";
import { 
  Container, Typography, Button, Box, Select, MenuItem, TextField, 
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, 
  Paper, IconButton, Divider, useTheme, useMediaQuery 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Player } from "../../types/Player";

import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import { SquadStats } from "../../components/SquadStats/SquadStats";
import { useUser } from "../../contexts/UseUser";

const Players: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inSquad, setInSquad] = useState<Player[]>([]); 
  const [onTransferList, setOnTransferList] = useState<Player[]>([]); 
  
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("tys");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  const fetchData = async () => {
    if (!user?.club) return;
    try {
      const resSquad = await fetch(`http://localhost:5000/players/${user.club}`);
      const dataSquad = await resSquad.json();
      
      const resMarket = await fetch(`http://localhost:5000/transferlist/${user.club}`);
      const dataMarket = await resMarket.json();

      const map = (d: any) => d.map((i: any) => ({
        id: i.ID || i[0], name: i.NAME || i[1], position: i.POSITION || i[2],
        age: i.AGE || i[3], nation: i.NATION || i[4], club: i.CLUB || i[5], price: i.PRICE || i[6]
      }));

      setInSquad(map(Array.isArray(dataSquad) ? dataSquad : []));
      setOnTransferList(map(Array.isArray(dataMarket) ? dataMarket : []));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, [user?.club]);

  const handleAddtoTransfer = async () => {
    const formattedPrice = unit === "mln" && !price.includes(",") ? price + ",00" : price;
    await fetch("http://localhost:5000/transferlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedPlayer, price: `${formattedPrice} ${unit}` }),
    });
    setSnackbar({ open: true, message: "Wystawiono na sprzedaż!", severity: "success" });
    fetchData();
    setIsDialogOpen(false);
    setPrice("");
  };

  const handleRemoveFromTransfer = async (p: Player) => {
    await fetch(`http://localhost:5000/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    setSnackbar({ open: true, message: "Zdjęto z listy transferowej!", severity: "success" });
    fetchData();
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", pb: 6 }}>

      <Box 
        component="header" 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          padding: "16px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "sticky", 
          top: 0, 
          zIndex: 10,
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        {isMobile && (
          <IconButton onClick={() => setIsMenuOpen(true)} sx={{ color: "#0A1929", mr: 2 }}>
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#0A1929", letterSpacing: 1 }}>
          ZARZĄDZANIE KADRĄ
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box 
        component="main"
        sx={{ 
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease",
          p: { xs: 2, md: 4 }
        }}
      >
        <Container maxWidth="md">

          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: "white", border: "1px solid #eef2f6", mb: 4 }}>
             <SquadStats players={[...inSquad, ...onTransferList]} />
          </Paper>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: "#0A1929", display: "flex", alignItems: "center", gap: 1.5 }}>
              Moja Kadra 
              <Box component="span" sx={{ fontSize: "0.9rem", bgcolor: "#00B4D8", color: "white", px: 1.5, py: 0.5, borderRadius: "20px" }}>
                {inSquad.length}
              </Box>
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {inSquad.map(p => (
                <Paper 
                  key={p.id} 
                  elevation={0}
                  sx={{ 
                    p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", 
                    borderRadius: 3, border: "1px solid #eef2f6", bgcolor: "white",
                    transition: "transform 0.2s", "&:hover": { transform: "translateX(5px)", borderColor: "#00B4D8" }
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#0A1929" }}>{p.name}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {p.position} • {p.age} lat • {p.nation}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => { setSelectedPlayer(p); setIsDialogOpen(true); }}
                    sx={{ borderRadius: "50px", fontWeight: 700, textTransform: "none", px: 3, bgcolor: "#0A1929" }}
                  >
                    Wystaw na listę
                  </Button>
                </Paper>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6, opacity: 0.1 }} />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: "#FF007A", display: "flex", alignItems: "center", gap: 1.5 }}>
              Na liście transferowej
              <Box component="span" sx={{ fontSize: "0.9rem", bgcolor: "#FF007A", color: "white", px: 1.5, py: 0.5, borderRadius: "20px" }}>
                {onTransferList.length}
              </Box>
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {onTransferList.map(p => (
                <Paper 
                  key={p.id} 
                  elevation={0}
                  sx={{ 
                    p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", 
                    borderRadius: 3, border: "1px solid rgba(255, 0, 122, 0.2)", bgcolor: "rgba(255, 0, 122, 0.02)",
                    transition: "transform 0.2s", "&:hover": { transform: "translateX(5px)" }
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#0A1929" }}>{p.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#FF007A", fontWeight: 700 }}>Cena: {p.price}</Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small" 
                    onClick={() => handleRemoveFromTransfer(p)}
                    sx={{ borderRadius: "50px", fontWeight: 700, textTransform: "none", px: 3 }}
                  >
                    Zdejmij z listy
                  </Button>
                </Paper>
              ))}
              {onTransferList.length === 0 && (
                <Typography variant="body2" sx={{ color: "text.disabled", fontStyle: "italic", textAlign: "center" }}>
                  Obecnie żaden zawodnik nie jest wystawiony na sprzedaż.
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 900, color: "#0A1929" }}>Wystaw na sprzedaż</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Ustalasz cenę rynkową dla zawodnika: <strong>{selectedPlayer?.name}</strong>.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField 
              label="Cena" 
              fullWidth 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <Select 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              sx={{ borderRadius: 3, minWidth: 90 }}
            >
              <MenuItem value="tys">tys</MenuItem>
              <MenuItem value="mln">mln</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsDialogOpen(false)} sx={{ fontWeight: 700, color: "text.secondary" }}>Anuluj</Button>
          <Button 
            variant="contained" 
            onClick={handleAddtoTransfer} 
            sx={{ borderRadius: "50px", fontWeight: 800, px: 4, bgcolor: "#FF007A", "&:hover": { bgcolor: "#D80065" } }}
          >
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Players;