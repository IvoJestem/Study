import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Player } from "../../types/Player";

interface PlayerTableProps {
  players: Player[];
}

const headers = ["Imię i Nazwisko", "Pozycja", "Wiek", "Narodowość", "Klub", "Wartość"];

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: 0 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
          <TableRow>
            {headers.map((header) => (
              <TableCell 
                key={header} 
                sx={{ 
                  fontWeight: 800, 
                  color: "#0A1929", 
                  textTransform: "uppercase", 
                  fontSize: "0.85rem",
                  borderBottom: "2px solid #eef2f6"
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <TableRow 
                key={player.id || index} 
                hover 
                sx={{ 
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { backgroundColor: "rgba(0, 180, 216, 0.04)" }
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "rgba(10, 25, 41, 0.05)", 
                        color: "#0A1929", 
                        width: 36, 
                        height: 36 
                      }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    <Typography sx={{ fontWeight: 800, color: "#0A1929" }}>
                      {player.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {player.position}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#0A1929" }}>
                  {player.age}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {player.nation}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#0A1929" }}>
                  {player.club}
                </TableCell>
                <TableCell sx={{ fontWeight: 900, color: "#00B4D8", letterSpacing: 0.5 }}>
                  {player.price}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  Brak danych do wyświetlenia
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;