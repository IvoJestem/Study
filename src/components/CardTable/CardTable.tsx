import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { Player } from "../Database/Database";

interface CardTableProps {
  cards: Player[];
}

const positionOrder: { [key: string]: number } = {
  Bramkarz: 1,
  "Prawy Obrońca": 2,
  "Lewy Obrońca": 3,
  "Środkowy Obrońca": 4,
  "Defensywny Pomocnik": 5,
  "Środkowy Pomocnik": 6,
  "Ofensywny Pomocnik": 7,
  "Prawy Pomocnik": 8,
  "Lewy Pomocnik": 9,
  "Cofnięty Napastnik": 10,
  "Prawy Napastnik": 11,
  "Lewy Napastnik": 12,
  "Środkowy Napastnik": 13,
};

const sortNumeric = (price: string): number => {
  const value = price.toLowerCase().replace(/[^0-9a-z]/g, "");
  if (value.includes("mln")) {
    return parseFloat(value.replace("mln", "")) * 1000000;
  } else if (value.includes("tyś")) {
    return parseFloat(value.replace("tyś", "")) * 1000;
  } else {
    return parseFloat(value);
  }
};

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedCards = useMemo(() => {
    const sortableCards = [...cards];
    if (sortConfig !== null) {
      sortableCards.sort((a, b) => {
        const { key, direction } = sortConfig;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let aValue: any, bValue: any;

        if (key === "position") {
          aValue = positionOrder[a[key]];
          bValue = positionOrder[b[key]];
        } else if (key === "price") {
          aValue = sortNumeric(a[key]);
          bValue = sortNumeric(b[key]);
        } else {
          aValue = a[key];
          bValue = b[key];
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCards;
  }, [cards, sortConfig]);

  const requestSort = (key: keyof Player) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "name"}
                direction={
                  sortConfig?.key === "name" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("name")}
              >
                Nazwa
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "position"}
                direction={
                  sortConfig?.key === "position" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("position")}
              >
                Pozycja
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "age"}
                direction={
                  sortConfig?.key === "age" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("age")}
              >
                Wiek
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "nation"}
                direction={
                  sortConfig?.key === "nation" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("nation")}
              >
                Narodowość
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "club"}
                direction={
                  sortConfig?.key === "club" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("club")}
              >
                Klub
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig?.key === "price"}
                direction={
                  sortConfig?.key === "price" ? sortConfig.direction : "asc"
                }
                onClick={() => requestSort("price")}
              >
                Cena
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCards.map((card, index) => (
            <TableRow key={index}>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.position}</TableCell>
              <TableCell>{card.age}</TableCell>
              <TableCell>{card.nation}</TableCell>
              <TableCell>{card.club}</TableCell>
              <TableCell>{card.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
