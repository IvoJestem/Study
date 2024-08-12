import React, { useState } from "react";
import "./Form.css";

// Utility function to convert price from amount and unit to number
export const convertPriceToNumber = (amount: number, unit: string): number => {
  let numericPrice = amount;

  if (unit === "mln") {
    numericPrice *= 1000000;
  } else if (unit === "tyś") {
    numericPrice *= 1000;
  }

  return numericPrice;
};

interface FormProps {
  onSearchPlayer: (criteria: {
    name: string;
    position: string;
    ageMin: number | null;
    ageMax: number | null;
    nation: string;
    club: string;
    priceMin: number | null;
    priceMax: number | null;
  }) => void;
}

const positions = [
  "Bramkarz",
  "Prawy Obrońca",
  "Lewy Obrońca",
  "Środkowy Obrońca",
  "Defensywny Pomocnik",
  "Środkowy Pomocnik",
  "Ofensywny Pomocnik",
  "Prawy Pomocnik",
  "Lewy Pomocnik",
  "Cofnięty Napastnik",
  "Prawy Napastnik",
  "Lewy Napastnik",
  "Środkowy Napastnik",
];

export const SearchForm: React.FC<FormProps> = ({ onSearchPlayer }) => {
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [nation, setNation] = useState<string>("");
  const [club, setClub] = useState<string>("");
  const [priceMinAmount, setPriceMinAmount] = useState<number | null>(null);
  const [priceMinUnit, setPriceMinUnit] = useState<string>("tyś");
  const [priceMaxAmount, setPriceMaxAmount] = useState<number | null>(null);
  const [priceMaxUnit, setPriceMaxUnit] = useState<string>("tyś");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchPlayer({
      name,
      position,
      ageMin,
      ageMax,
      nation,
      club,
      priceMin:
        priceMinAmount !== null
          ? convertPriceToNumber(priceMinAmount, priceMinUnit)
          : null,
      priceMax:
        priceMaxAmount !== null
          ? convertPriceToNumber(priceMaxAmount, priceMaxUnit)
          : null,
    });
  };

  const handleReset = () => {
    setName("");
    setPosition("");
    setAgeMin(null);
    setAgeMax(null);
    setNation("");
    setClub("");
    setPriceMinAmount(null);
    setPriceMinUnit("tyś");
    setPriceMaxAmount(null);
    setPriceMaxUnit("tyś");
    onSearchPlayer({
      name: "",
      position: "",
      ageMin: null,
      ageMax: null,
      nation: "",
      club: "",
      priceMin: null,
      priceMax: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nazwa"
        />
      </div>
      <div>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="">Wybierz pozycję</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          value={ageMin ?? ""}
          onChange={(e) =>
            setAgeMin(e.target.value ? Number(e.target.value) : null)
          }
          type="number"
          placeholder="Wiek min"
        />
        <input
          value={ageMax ?? ""}
          onChange={(e) =>
            setAgeMax(e.target.value ? Number(e.target.value) : null)
          }
          type="number"
          placeholder="Wiek max"
        />
      </div>
      <div>
        <input
          value={nation}
          onChange={(e) => setNation(e.target.value)}
          type="text"
          placeholder="Narodowość"
        />
      </div>
      <div>
        <input
          value={club}
          onChange={(e) => setClub(e.target.value)}
          type="text"
          placeholder="Klub"
        />
      </div>
      <div>
        <input
          type="number"
          value={priceMinAmount ?? ""}
          onChange={(e) =>
            setPriceMinAmount(e.target.value ? Number(e.target.value) : null)
          }
          placeholder="Cena min"
        />
        <select
          value={priceMinUnit}
          onChange={(e) => setPriceMinUnit(e.target.value)}
        >
          <option value="tyś">tyś</option>
          <option value="mln">mln</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          value={priceMaxAmount ?? ""}
          onChange={(e) =>
            setPriceMaxAmount(e.target.value ? Number(e.target.value) : null)
          }
          placeholder="Cena max"
        />
        <select
          value={priceMaxUnit}
          onChange={(e) => setPriceMaxUnit(e.target.value)}
        >
          <option value="tyś">tyś</option>
          <option value="mln">mln</option>
        </select>
      </div>
      <button type="submit">Szukaj</button>
      <button type="button" onClick={handleReset}>
        Resetuj
      </button>
    </form>
  );
};
