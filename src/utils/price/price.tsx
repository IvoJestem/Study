// utils/price/price.ts

import { Player } from "../../components/Database/Database";

/**
 * Funkcja konwertuje cenę z formatu tekstowego na liczbę, uwzględniając jednostki 'mln' (milion) i 'tyś' (tysiąc).
 * @param amount Kwota liczbowo.
 * @param unit Jednostka ('mln' lub 'tyś').
 * @returns Cena w formie liczbowej.
 */
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

/**
 * Funkcja oblicza łączną cenę zawodników.
 * @param players Lista zawodników.
 * @returns Łączna cena.
 */
export const calculateTotalPrice = (players: Player[]): number => {
  return players.reduce((total, player) => {
    if (player.price === "") {
      return total; // Pomiń zawodników bez określonej ceny
    }

    const priceString = player.price;
    const amount = parseFloat(
      priceString.replace(/[^0-9.,]/g, "").replace(",", ".")
    );

    // Określenie jednostki
    let unit: string = "tyś"; // Domyślna jednostka
    if (priceString.toLowerCase().includes("mln")) {
      unit = "mln";
    } else if (priceString.toLowerCase().includes("tyś")) {
      unit = "tyś";
    }

    // Konwersja ceny
    return total + (amount ? convertPriceToNumber(amount, unit) ?? 0 : 0);
  }, 0);
};
