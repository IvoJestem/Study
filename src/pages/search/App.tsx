import React, { useState } from "react";
import { convertPriceToNumber, SearchForm } from "./Form";
import PlayerTable from "./PlayerTable";
import { initialPlayer, Player } from "../../components/Database/Database";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import "../../../index.css";

const Search: React.FC = () => {
  const [players] = useState<Player[]>(initialPlayer);
  const [filteredPlayers, setFilteredPlayers] =
    useState<Player[]>(initialPlayer);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const handleSearchPlayer = (criteria: {
    name: string;
    position: string;
    ageMin: number | null;
    ageMax: number | null;
    nation: string;
    club?: string;
    priceMin: number | null;
    priceMax: number | null;
  }) => {
    const { name, position, ageMin, ageMax, nation, club, priceMin, priceMax } =
      criteria;

    const nationArray = nation.toLowerCase().split(" ").filter(Boolean);
    const clubArray = club?.toLowerCase().split(" ").filter(Boolean) ?? [];

    const filtered = players.filter((player) => {
      let playerPrice = 0;
      if (player.price.includes("mln")) {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "mln");
      } else if (player.price.includes("tyś")) {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "tyś");
      } else {
        playerPrice = convertPriceToNumber(parseFloat(player.price), "");
      }

      const playerNationMatches =
        nationArray.length === 0 ||
        nationArray.some((nationItem) =>
          player.nation.toLowerCase().includes(nationItem)
        );
      const playerClubMatches =
        clubArray.length === 0 ||
        clubArray.some((clubItem) =>
          player.club?.toLowerCase().includes(clubItem)
        );

      return (
        (name === "" ||
          player.name.toLowerCase().includes(name.toLowerCase())) &&
        (position === "" || player.position === position) &&
        (ageMin === null || player.age >= ageMin) &&
        (ageMax === null || player.age <= ageMax) &&
        playerNationMatches &&
        playerClubMatches &&
        (priceMin === null || playerPrice >= priceMin) &&
        (priceMax === null || playerPrice <= priceMax)
      );
    });

    setFilteredPlayers(filtered);
    setIsSearched(true);
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
        {}
        {isSearched && <PlayerTable players={filteredPlayers} />}
      </div>
    </div>
  );
};

export default Search;
