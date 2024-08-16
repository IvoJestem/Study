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
  TableSortLabel,
} from "@mui/material";
import { Player } from "../../components/Database/Database";

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, maxWidth: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          backgroundColor: "background.paper",
          fontWeight: "bold",
        }}
      >
        Lista Zawodników
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Imię</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Pozycja</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Wiek</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Narodowość</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Klub</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Cena</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length > 0 ? (
            players.map((player) => (
              <TableRow key={player.name}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.nation}</TableCell>
                <TableCell>{player.club}</TableCell>
                <TableCell>{player.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
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
