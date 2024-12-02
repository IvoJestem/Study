import { Player } from "../../types/Player";
import { calculateTotalPrice } from "../price/price";

const generateCombinations = (
  players: Player[],
  positions: string[],
  budget: number,
  userClub: string // Dodano argument z nazwą klubu użytkownika
): Player[][] => {
  const results: Player[][] = [];

  const filteredPlayers = players.filter(
    (player) => positions.includes(player.position) && player.club !== userClub
  );

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

    for (let i = start; i < filteredPlayers.length; i++) {
      findCombinations([...currentCombo, filteredPlayers[i]], i + 1);
    }
  };

  findCombinations([], 0);
  return results;
};

export default generateCombinations;
