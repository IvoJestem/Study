import { Player } from "../../components/Database/Database";
import { calculateTotalPrice } from "../price/price";

/**
 * Funkcja generuje wszystkie możliwe kombinacje zawodników, które spełniają wymagania dotyczące pozycji i budżetu.
 * @param players Lista zawodników.
 * @param positions Wymagane pozycje.
 * @param budget Budżet na zawodników.
 * @returns Lista kombinacji zawodników.
 */
const generateCombinations = (
  players: Player[],
  positions: string[],
  budget: number
): Player[][] => {
  const results: Player[][] = [];

  const findCombinations = (currentCombo: Player[], start: number) => {
    const comboPositions = new Set(
      currentCombo.map((player) => player.position)
    );

    if (
      positions.every((pos) => comboPositions.has(pos)) &&
      calculateTotalPrice(currentCombo) <= budget
    ) {
      results.push([...currentCombo]);
    }

    for (let i = start; i < players.length; i++) {
      findCombinations([...currentCombo, players[i]], i + 1);
    }
  };

  findCombinations([], 0);
  return results;
};

export default generateCombinations;
