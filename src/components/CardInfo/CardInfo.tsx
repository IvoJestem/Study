import React from "react";
import { TableCell, TableRow } from "@mui/material";

interface PlayerInfoProps {
  name: string;
  position: string;
  age: number;
  nation: string;
  club: string;
  price: string;
}

export const CardInfo: React.FC<PlayerInfoProps> = ({
  name,
  position,
  age,
  nation,
  club,
  price,
}) => {
  return (
    <TableRow hover sx={{ transition: "0.2s" }}>
      <TableCell sx={{ fontWeight: 600 }}>{name}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{nation}</TableCell>
      <TableCell>{club}</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
        {price}
      </TableCell>
    </TableRow>
  );
};