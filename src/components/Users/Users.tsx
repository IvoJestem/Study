export interface Users {
  name: string;
  password: string;
  club: string;
  role: string;
  email: string;
  phone: number;
  verify: boolean;
}

export const users: Users[] = [
  {
    name: "Zeko Buvac",
    password: "123",
    club: "Dinamo Moskwa",
    role: "Director",
    email: "zeko@mial.ru",
    phone: 7796986967,
    verify: false,
  },
  {
    name: "admin",
    password: "123",
    club: "Main Club",
    role: "Owner",
    email: "mail@mail.pl",
    phone: 123456789,
    verify: true,
  },
];
