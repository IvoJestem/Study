import React, { createContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  password: string;
  club: string;
  role: string;
  email: string;
  phone: string;
  verify: boolean;
  avatar: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
