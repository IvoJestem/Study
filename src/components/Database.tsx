export interface Player {
  name: string;
  position: string;
  age: number;
  nation: string;
  club?: string;
  price: string;
}

export const initialPlayer: Player[] = [
  {
    name: "Amar Drina",
    position: "Środkowy Obrońca",
    age: 22,
    nation: "Bośnia i Hercegowina",
    club: "Nieznany",
    price: "150tyś €",
  },
  {
    name: "Mikayil Faye",
    position: "Środkowy Obrońca",
    age: 20,
    nation: "Senegal",
    club: "FC Barcelona",
    price: "10mln €",
  },
  {
    name: "Marco Reus",
    position: "Ofensywny Pomocnik",
    age: 35,
    nation: "Niemcy",
    club: "",
    price: "0 €",
  },
  {
    name: "Bujar Pllana",
    position: "Środkowy Obrońca",
    age: 22,
    nation: "Kosowo",
    club: "Slaven Belupo Koprivnica",
    price: "300tyś €",
  },
  {
    name: "Loic Bald",
    position: "Środkowy Obrońca",
    age: 24,
    nation: "Francja",
    club: "Sevilla FC",
    price: "14mln €",
  },
  {
    name: "Deniz Undav",
    position: "Środkowy Napastnik",
    age: 28,
    nation: "Niemcy",
    club: "Brighton & Hove Albion",
    price: "25mln €",
  },
  {
    name: "Mateo Retegui",
    position: "Środkowy Napastnik",
    age: 25,
    nation: "Włochy",
    club: "Genoa CFC",
    price: "16mln €",
  },
  {
    name: "Bryan Zaragoza",
    position: "Lewy Napastnik",
    age: 22,
    nation: "Hiszpania",
    club: "Bayern Monachium",
    price: "12mln €",
  },
  {
    name: "Jeffrey de Lange",
    position: "Bramkarz",
    age: 26,
    nation: "Holandia",
    club: "Go Agead Eagles Deventer",
    price: "3mln €",
  },
  {
    name: "Noah Mrosek",
    position: "Prawy Obrońca",
    age: 20,
    nation: "Polska",
    club: "",
    price: "0 €",
  },
  {
    name: "Willian Pacho",
    position: "Środkowy Obrońca",
    age: 22,
    nation: "Ekwador",
    club: "Eintracht Frankfurt",
    price: "35mln €",
  },
  {
    name: "Rayane Messo",
    position: "Lewy Napastnik",
    age: 17,
    nation: "Francja",
    club: "Dijon FCO B",
    price: "400tyś €",
  },
  {
    name: "M'Bala Nzola",
    position: "Środkowy Napastnik",
    age: 27,
    nation: "Angola",
    club: "AC Fiorentina",
    price: "7mln €",
  },
];
