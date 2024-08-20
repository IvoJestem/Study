export interface Users {
  name: string;
  password: string;
  club: string;
  role: string;
  email: string;
  phone: number;
  verify: boolean;
  avatar?: string;
}

export const users: Users[] = [
  {
    name: "admin",
    password: "123",
    club: "Main Club",
    role: "Własciciel",
    email: "mail@mail.pl",
    phone: 123456789,
    verify: true,
  },
  {
    name: "Maria Lopez",
    password: "maria2024",
    club: "FC Barcelona",
    role: "Menadżer",
    email: "maria.lopez@fcbarcelona.com",
    phone: 987654321,
    verify: true,
  },
  {
    name: "John Doe",
    password: "john123",
    club: "Liverpool FC",
    role: "Agent",
    email: "john.doe@liverpoolfc.com",
    phone: 456789123,
    verify: false,
  },
  {
    name: "Paul Johnson",
    password: "paul2024",
    club: "Manchester United",
    role: "Prezydent",
    email: "paul.johnson@manutd.com",
    phone: 654987321,
    verify: true,
  },
  {
    name: "Nina Kovac",
    password: "nina456",
    club: "Paris Saint-Germain",
    role: "Agent",
    email: "nina.kovac@psg.com",
    phone: 321654987,
    verify: false,
  },
  {
    name: "Sven Müller",
    password: "sven789",
    club: "Bayern Munich",
    role: "Menadżer",
    email: "sven.muller@fcbayern.com",
    phone: 123789456,
    verify: true,
  },
  {
    name: "Anya Petrov",
    password: "anya321",
    club: "Zenit Saint Petersburg",
    role: "Dyrektor Sportowy",
    email: "anya.petrov@fc-zenit.ru",
    phone: 789456123,
    verify: false,
  },
];
