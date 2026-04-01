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
import { Player } from "../../types/Player";

interface CardTableProps {
  cards: Player[];
}

type SortableKeys = "name" | "position" | "age" | "nation" | "club" | "price";

interface HeadCell {
  id: SortableKeys;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "name", label: "Nazwa" },
  { id: "position", label: "Pozycja" },
  { id: "age", label: "Wiek" },
  { id: "nation", label: "Narodowość" },
  { id: "club", label: "Klub" },
  { id: "price", label: "Cena" },
];

const positionOrder: { [key: string]: number } = {
  Bramkarz: 1,
  "Lewy obrońca": 2,
  "Środkowy obrońca": 3,
  "Prawy obrońca": 4,
  "Defensywny pomocnik": 5,
  "Lewy pomocnik": 6,
  "Środkowy pomocnik": 7,
  "Ofensywny pomocnik": 8,
  "Prawy pomocnik": 9,
  "Lewy napastnik": 10,
  "Prawy napastnik": 11,
  "Cofnięty napastnik": 12,
  "Środkowy napastnik": 13,
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

        let aValue: string | number = a[key] as string | number;
        let bValue: string | number = b[key] as string | number;

        if (key === "position") {
          aValue = positionOrder[a[key] as string] || 99;
          bValue = positionOrder[b[key] as string] || 99;
        } else if (key === "price") {
          aValue = sortNumeric(a[key] as string);
          bValue = sortNumeric(b[key] as string);
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableCards;
  }, [cards, sortConfig]);

  const requestSort = (key: keyof Player) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig?.key === headCell.id}
                  direction={
                    sortConfig?.key === headCell.id ? sortConfig.direction : "asc"
                  }
                  onClick={() => requestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCards.map((card, index) => (
            <TableRow key={card.id || index} hover sx={{ transition: "0.2s" }}>
              <TableCell sx={{ fontWeight: 500 }}>{card.name}</TableCell>
              <TableCell>{card.position}</TableCell>
              <TableCell>{card.age}</TableCell>
              <TableCell>{card.nation}</TableCell>
              <TableCell>{card.club}</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                {card.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;