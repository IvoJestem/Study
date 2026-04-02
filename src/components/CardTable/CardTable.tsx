import React, { useState, useMemo, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TableSortLabel, Checkbox, Button, Box, Typography, IconButton, 
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Avatar 
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; 
import PersonIcon from "@mui/icons-material/Person";
import { Player } from "../../types/Player";
import axios from "axios";
import { useUser } from "../../contexts/UseUser";

interface CardTableProps {
  cards: Player[];
}
type SortableKeys = "name" | "position" | "age" | "nation" | "club" | "price";

const headCells: { id: SortableKeys; label: string }[] = [
  { id: "name", label: "Nazwa" }, { id: "position", label: "Pozycja" },
  { id: "age", label: "Wiek" }, { id: "nation", label: "Narodowość" },
  { id: "club", label: "Klub" }, { id: "price", label: "Cena" }
];

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
  const { user } = useUser();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: "asc" | "desc" } | null>(null);
  
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  const [shortlistedIds, setShortlistedIds] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" | "info" });

  useEffect(() => {
    if (user?.phone) {
      axios.get(`http://localhost:5000/api/shortlist/ids?phone=${user.phone}`)
        .then(res => setShortlistedIds(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleToggleShortlist = async (playerId: number) => {
    if (!user?.phone) return;
    const isAlreadyShortlisted = shortlistedIds.includes(playerId);

    try {
      if (isAlreadyShortlisted) {
        await axios.delete(`http://localhost:5000/api/shortlist?phone=${user.phone}&id=${playerId}`);
        setShortlistedIds(prev => prev.filter(id => id !== playerId));
        setSnackbar({ open: true, message: "Usunięto z obserwowanych", severity: "info" });
      } else {
        await axios.post("http://localhost:5000/api/shortlist", { phone: user.phone, id: playerId });
        setShortlistedIds(prev => [...prev, playerId]);
        setSnackbar({ open: true, message: "Dodano do obserwowanych!", severity: "success" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Wystąpił błąd", severity: "error" });
    }
  };

  const sortedCards = useMemo(() => {
    const sortableCards = [...cards];
    if (sortConfig !== null) {
      sortableCards.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableCards;
  }, [cards, sortConfig]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id]);
  };

  const selectedPlayers = cards.filter(card => selectedIds.includes(card.id));

  return (
    <Box>
      {selectedIds.length === 2 && (
        <Box 
          sx={{ 
            display: "flex", justifyContent: "space-between", alignItems: "center", 
            mb: 3, p: 2, px: 3,
            background: "linear-gradient(135deg, #0A1929 0%, #1a365d 100%)", 
            borderRadius: 3,
            boxShadow: "0 10px 20px rgba(10, 25, 41, 0.2)"
          }}
        >
          <Typography sx={{ fontWeight: 800, color: "white", letterSpacing: 0.5 }}>
            Gotowość do porównania zawodników (2/2)
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<CompareArrowsIcon />}
            onClick={() => setIsCompareOpen(true)}
            sx={{ 
              bgcolor: "#FF007A", 
              fontWeight: 800, 
              borderRadius: "50px", 
              px: 4,
              "&:hover": { bgcolor: "#D80065", transform: "scale(1.05)" },
              transition: "all 0.2s"
            }}
          >
            Porównaj
          </Button>
        </Box>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: "0 5px 15px rgba(0,0,0,0.03)", borderRadius: 3, border: "1px solid #eef2f6" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8fafc" }}>
            <TableRow>
              <TableCell padding="checkbox" />
              {headCells.map((cell) => (
                <TableCell key={cell.id} sx={{ fontWeight: 800, color: "#0A1929", textTransform: "uppercase", fontSize: "0.85rem" }}>
                  <TableSortLabel
                    active={sortConfig?.key === cell.id}
                    direction={sortConfig?.key === cell.id ? sortConfig.direction : "asc"}
                    onClick={() => setSortConfig({ key: cell.id, direction: sortConfig?.direction === "asc" ? "desc" : "asc" })}
                  >
                    {cell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 800, color: "#0A1929", textTransform: "uppercase", fontSize: "0.85rem" }}>
                Obserwuj
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCards.map((card, index) => {
              const isSelected = selectedIds.includes(card.id);
              const isShortlisted = shortlistedIds.includes(card.id);
              const isMyPlayer = card.club === user?.club;

              return (
                <TableRow 
                  key={card.id || index} 
                  hover 
                  selected={isSelected}
                  sx={{ 
                    transition: "all 0.2s",
                    "&.Mui-selected": { backgroundColor: "rgba(0, 180, 216, 0.08)" },
                    "&.Mui-selected:hover": { backgroundColor: "rgba(0, 180, 216, 0.12)" },
                    "&:hover": { backgroundColor: "rgba(0, 180, 216, 0.04)" }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox 
                      checked={isSelected} 
                      onChange={() => handleSelect(card.id)} 
                      sx={{ color: "#00B4D8", "&.Mui-checked": { color: "#00B4D8" } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: isSelected ? "#00B4D8" : "rgba(10, 25, 41, 0.05)", color: isSelected ? "white" : "#0A1929", width: 36, height: 36 }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      <Typography sx={{ fontWeight: 800, color: "#0A1929" }}>{card.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>{card.position}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#0A1929" }}>{card.age}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>{card.nation}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#0A1929" }}>{card.club}</TableCell>
                  <TableCell sx={{ fontWeight: 900, color: "#00B4D8", letterSpacing: 0.5 }}>{card.price}</TableCell>
                  <TableCell align="right">
                    {!isMyPlayer && (
                      <IconButton 
                        onClick={() => handleToggleShortlist(card.id)}
                        sx={{ 
                          color: isShortlisted ? "#FF007A" : "text.disabled",
                          "&:hover": { color: "#FF007A", backgroundColor: "rgba(255, 0, 122, 0.08)" }
                        }}
                      >
                        {isShortlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 900, fontSize: "1.5rem", bgcolor: "#0A1929", color: "white", letterSpacing: 2 }}>
          RAPORT SKAUTINGOWY
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, md: 5 }, mt: 2, bgcolor: "#f8fafc" }}>
         {selectedPlayers.length === 2 && (
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>

              <Box sx={{ flex: 1, width: "100%" }}>
                <Paper elevation={10} sx={{ p: 4, textAlign: "center", borderRadius: 4, borderTop: "8px solid #00B4D8" }}>
                  <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2, bgcolor: "rgba(0, 180, 216, 0.1)", color: "#00B4D8" }}>
                    <PersonIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0A1929", mb: 2 }}>{selectedPlayers[0].name}</Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Wiek:</strong> {selectedPlayers[0].age}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Pozycja:</strong> {selectedPlayers[0].position}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Kraj:</strong> {selectedPlayers[0].nation}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Klub:</strong> {selectedPlayers[0].club}</Typography>
                  <Typography variant="h5" sx={{ mt: 3, color: "#00B4D8", fontWeight: 900 }}>{selectedPlayers[0].price}</Typography>
                </Paper>
              </Box>

              <Box sx={{ px: 2, textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "#0A1929", fontStyle: "italic", opacity: 0.2 }}>
                  VS
                </Typography>
              </Box>

              <Box sx={{ flex: 1, width: "100%" }}>
                <Paper elevation={10} sx={{ p: 4, textAlign: "center", borderRadius: 4, borderTop: "8px solid #FF007A" }}>
                  <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2, bgcolor: "rgba(255, 0, 122, 0.1)", color: "#FF007A" }}>
                    <PersonIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0A1929", mb: 2 }}>{selectedPlayers[1].name}</Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Wiek:</strong> {selectedPlayers[1].age}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Pozycja:</strong> {selectedPlayers[1].position}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Kraj:</strong> {selectedPlayers[1].nation}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Klub:</strong> {selectedPlayers[1].club}</Typography>
                  <Typography variant="h5" sx={{ mt: 3, color: "#FF007A", fontWeight: 900 }}>{selectedPlayers[1].price}</Typography>
                </Paper>
              </Box>

            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", justifyContent: "center" }}>
          <Button 
            onClick={() => setIsCompareOpen(false)} 
            variant="outlined" 
            size="large" 
            sx={{ fontWeight: 800, borderRadius: "50px", px: 5, color: "#0A1929", borderColor: "#0A1929" }}
          >
            Zamknij panel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CardTable;