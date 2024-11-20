import { Player } from "../../types/Player";


export const convertPriceToNumber = (
  amount: number | null,
  unit: string
): number | null => {
  if (amount === null) {
    return null;
  }

  switch (unit) {
    case "mln":
      return amount * 1000000;
    case "tyś":
      return amount * 1000;
    default:
      return amount;
  }
};

export const calculateTotalPrice = (players: Player[]): number => {
  return players.reduce((total, player) => {
    if (player.price === "") {
      return total;
    }

    const priceString = player.price;
    const amount = parseFloat(
      priceString.replace(/[^0-9.,]/g, "").replace(",", ".")
    );

    let unit: string = "tyś";
    if (priceString.toLowerCase().includes("mln")) {
      unit = "mln";
    } else if (priceString.toLowerCase().includes("tyś")) {
      unit = "tyś";
    }

    return total + (amount ? convertPriceToNumber(amount, unit) ?? 0 : 0);
  }, 0);
};
