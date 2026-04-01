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
} from "@mui/material";
import { Player } from "../../types/Player";

interface PlayerTableProps {
  players: Player[];
}

const headers = ["Imię", "Pozycja", "Wiek", "Narodowość", "Klub", "Cena"];

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "white",
          fontWeight: "bold",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        Lista Zawodników
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} sx={{ fontWeight: "bold" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <TableRow key={player.id || index} hover sx={{ transition: "0.2s" }}>
                <TableCell sx={{ fontWeight: 500 }}>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.nation}</TableCell>
                <TableCell>{player.club}</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                  {player.price}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3, color: "text.secondary" }}>
                Brak danych
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;