import { useContext, useEffect } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      context.setUser(JSON.parse(storedUser));
    }
  }, [context.setUser]); // Używamy context.setUser jako zależności, a nie całego context

  return context;
};
