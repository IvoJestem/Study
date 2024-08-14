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
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{nation}</TableCell>
      <TableCell>{club}</TableCell>
      <TableCell>{price}</TableCell>
    </TableRow>
  );
};
