import { Player } from "../../types/Player";

export const convertPriceToNumber = (
  amount: number | null,
  unit: string
): number | null => {
  if (amount === null) return null;

  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit.includes("mln")) {
    return amount * 1000000;
  }
  if (normalizedUnit.includes("tyś") || normalizedUnit.includes("tys")) {
    return amount * 1000;
  }
  return amount;
};

export const calculateTotalPrice = (players: Player[]): number => {
  return players.reduce((total, player) => {
    if (!player.price) return total;

    const normalizedPrice = player.price.toLowerCase().replace(",", ".");
    const numericMatch = normalizedPrice.match(/(\d+(\.\d+)?)/);
    
    if (!numericMatch) return total;

    const amount = parseFloat(numericMatch[0]);
    let unit = "";

    if (normalizedPrice.includes("mln")) {
      unit = "mln";
    } else if (normalizedPrice.includes("tyś") || normalizedPrice.includes("tys")) {
      unit = "tyś";
    }

    return total + (convertPriceToNumber(amount, unit) ?? 0);
  }, 0);
};