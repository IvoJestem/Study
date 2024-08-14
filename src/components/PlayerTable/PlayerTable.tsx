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
import { Player } from "../../components/Database/Database";

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Lista Zawodników
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imię</TableCell>
            <TableCell>Pozycja</TableCell>
            <TableCell>Wiek</TableCell>
            <TableCell>Narodowość</TableCell>
            <TableCell>Klub</TableCell>
            <TableCell>Cena</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.name}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.nation}</TableCell>
              <TableCell>{player.club}</TableCell>
              <TableCell>{player.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PlayerTable;
