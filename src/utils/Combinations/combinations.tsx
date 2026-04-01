import { Player } from "../../types/Player";
import { calculateTotalPrice } from "../price/price";

const generateCombinations = (
  players: Player[],
  positions: string[],
  budget: number,
  userClub: string
): Player[][] => {
  const results: Player[][] = [];
  
  const playersByPosition: { [key: string]: Player[] } = {};
  positions.forEach(pos => {
    playersByPosition[pos] = players.filter(
      p => p.position === pos && p.club !== userClub
    );
  });

  const uniquePositions = Array.from(new Set(positions));
  const positionCounts: { [key: string]: number } = {};
  positions.forEach(pos => {
    positionCounts[pos] = (positionCounts[pos] || 0) + 1;
  });

  const backtrack = (posIndex: number, currentCombo: Player[]) => {
    if (posIndex === uniquePositions.length) {
      if (calculateTotalPrice(currentCombo) <= budget) {
        results.push([...currentCombo]);
      }
      return;
    }

    const pos = uniquePositions[posIndex];
    const countNeeded = positionCounts[pos];
    const availablePlayers = playersByPosition[pos];

    const getCombinations = (start: number, count: number, tempCombo: Player[]) => {
      if (count === 0) {
        if (calculateTotalPrice([...currentCombo, ...tempCombo]) <= budget) {
          backtrack(posIndex + 1, [...currentCombo, ...tempCombo]);
        }
        return;
      }

      for (let i = start; i <= availablePlayers.length - count; i++) {
        getCombinations(i + 1, count - 1, [...tempCombo, availablePlayers[i]]);
      }
    };

    getCombinations(0, countNeeded, []);
  };

  if (uniquePositions.every(pos => playersByPosition[pos].length >= positionCounts[pos])) {
    backtrack(0, []);
  }

  return results.slice(0, 10);
};

export default generateCombinations;