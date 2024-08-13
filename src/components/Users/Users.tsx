export interface Users {
  name: string;
  login: string;
  password: string;
  club: string;
}

export const users: Users[] = [
  {
    name: "Zeko Buvac",
    login: "Zeko",
    password: "123",
    club: "Dinamo Moskwa",
  },
  {
    name: "Admin User",
    login: "admin",
    password: "123",
    club: "Main Club",
  },
];
