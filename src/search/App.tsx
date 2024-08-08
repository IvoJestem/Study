import React, { useState } from "react";
import { convertPriceToNumber, SearchForm } from "./Form";
import PlayerTable from "./PlayerTable";
import { initialPlayer, Player } from "../components/Database";
import SlideOutMenu from "../components/SlideOutMenu";
import "./App.css"; // Import stylów dla kontenera

const App: React.FC = () => {
  const [players] = useState<Player[]>(initialPlayer);
  const [filteredPlayers, setFilteredPlayers] =
    useState<Player[]>(initialPlayer);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSearchPlayer = (criteria: {
    name: string;
    position: string;
    ageMin: number | null;
    ageMax: number | null;
    nation: string;
    club: string;
    priceMin: number | null;
    priceMax: number | null;
  }) => {
    const { name, position, ageMin, ageMax, nation, club, priceMin, priceMax } =
      criteria;

    const filtered = players.filter((player) => {
      // Convert player price
      let playerPrice = 0;
      if (player.price.includes("mln")) {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "mln");
      } else if (player.price.includes("tyś")) {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "tyś");
      } else {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "");
      }

      return (
        (name === "" ||
          player.name.toLowerCase().includes(name.toLowerCase())) &&
        (position === "" || player.position === position) &&
        (ageMin === null || player.age >= ageMin) &&
        (ageMax === null || player.age <= ageMax) &&
        (nation === "" ||
          player.nation.toLowerCase().includes(nation.toLowerCase())) &&
        (club === "" ||
          player.club.toLowerCase().includes(club.toLowerCase())) &&
        (priceMin === null || playerPrice >= priceMin) &&
        (priceMax === null || playerPrice <= priceMax)
      );
    });

    setFilteredPlayers(filtered);
  };

  return (
    <div className="app-container">
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className={`content ${isMenuOpen ? "menu-open" : ""}`}>
        {!isMenuOpen && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            Open Menu
          </button>
        )}
        <h1>Wyszukiwarka Zawodników</h1>
        <SearchForm onSearchPlayer={handleSearchPlayer} />
        <PlayerTable players={filteredPlayers} />
      </div>
    </div>
  );
};

export default App;
