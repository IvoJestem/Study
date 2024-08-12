import React, { useState, useMemo } from "react";
import { Player } from "../../components/Database/Database";
import "./PlayerTable.css";

interface CardTableProps {
  cards: Player[];
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player;
    direction: "asc" | "desc";
  } | null>(null);

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

  const sortedCards = useMemo(() => {
    const sortableCards = [...cards];
    if (sortConfig !== null) {
      sortableCards.sort((a, b) => {
        const { key, direction } = sortConfig;

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
    <table className="card-table">
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>Nazwa</th>
          <th onClick={() => requestSort("position")}>Pozycja</th>
          <th onClick={() => requestSort("age")}>Wiek</th>
          <th onClick={() => requestSort("nation")}>Narodowość</th>
          <th onClick={() => requestSort("club")}>Klub</th>
          <th onClick={() => requestSort("price")}>Cena</th>
        </tr>
      </thead>
      <tbody>
        {sortedCards.map((card, index) => (
          <tr key={index}>
            <td>{card.name}</td>
            <td>{card.position}</td>
            <td>{card.age}</td>
            <td>{card.nation}</td>
            <td>{card.club}</td>
            <td>{card.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardTable;
